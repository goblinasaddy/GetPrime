# verify_questions.py
# Verification script for TCS NQT Question Database

import json
import os
import sys
import difflib

def verify_json(file_path):
    print(f"Loading questions from: {file_path}")
    if not os.path.exists(file_path):
        print(f"Error: File not found at {file_path}")
        return False
        
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            questions = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return False
        
    if not isinstance(questions, list):
        print("Error: JSON root must be an array of questions.")
        return False
        
    print(f"Successfully loaded {len(questions)} questions. Starting verification...\n")
    
    valid_sections = {
        "Numerical Ability", 
        "Reasoning Ability", 
        "Advanced Quantitative and Reasoning Ability", 
        "Verbal Ability",
        "Advanced Coding Easy",
        "Advanced Coding Medium"
    }
    valid_difficulties = {"Easy", "Medium", "Hard"}
    valid_types = {"MCQ", "Numeric", "Text", "Coding"}
    valid_sources = {"Original", "Community", "Inspired", "Faculty Contributed"}
    
    errors = []
    
    # Track statistics
    sections_count = {}
    topics_count = {}
    difficulties_count = {}
    seen_codes = set()
    
    for idx, q in enumerate(questions):
        q_label = f"Question #{idx+1} (Code: {q.get('code', 'Unknown')}, Topic: {q.get('topic', 'Unknown')})"
        
        # Check required fields
        required_fields = [
            "code", "question_text", "options", "correct_answer", "explanation", 
            "topic", "subtopic", "difficulty", "section", "question_type", 
            "estimated_solve_time", "source", "frequency", "verified"
        ]
        
        for field in required_fields:
            if field not in q:
                errors.append(f"{q_label}: Missing required field '{field}'")
                
        # Optional fields check
        optional_fields = ["question_image_url", "explanation_image_url", "common_mistakes", "tags", "exam_year"]
        for field in optional_fields:
            if field not in q:
                errors.append(f"{q_label}: Missing optional field key '{field}' (should be null or present)")
                
        # Code validation
        code = q.get("code")
        if code:
            if not isinstance(code, str):
                errors.append(f"{q_label}: 'code' must be a string.")
            else:
                if code in seen_codes:
                    errors.append(f"{q_label}: Duplicate question code '{code}' detected.")
                seen_codes.add(code)
                if not code.startswith("NQT-") or len(code) != 8 or not code[4:].isdigit():
                    errors.append(f"{q_label}: Code '{code}' must follow the pattern 'NQT-XXXX' (e.g. NQT-0001).")
                
        # Validate data types and values
        q_text = q.get("question_text", "")
        if not isinstance(q_text, str) or not q_text.strip():
            errors.append(f"{q_label}: 'question_text' must be a non-empty string.")
            
        sec = q.get("section")
        if sec not in valid_sections:
            errors.append(f"{q_label}: Invalid section '{sec}'. Expected one of {valid_sections}")
        else:
            sections_count[sec] = sections_count.get(sec, 0) + 1
            
        diff = q.get("difficulty")
        if diff not in valid_difficulties:
            errors.append(f"{q_label}: Invalid difficulty '{diff}'. Expected one of {valid_difficulties}")
        else:
            difficulties_count[diff] = difficulties_count.get(diff, 0) + 1
            
        topic = q.get("topic")
        if topic:
            topics_count[topic] = topics_count.get(topic, 0) + 1
            
        q_type = q.get("question_type")
        if q_type not in valid_types:
            errors.append(f"{q_label}: Invalid question_type '{q_type}'. Expected one of {valid_types}")
            
        src = q.get("source")
        if src not in valid_sources:
            errors.append(f"{q_label}: Invalid source '{src}'. Expected one of {valid_sources}")
            
        solve_time = q.get("estimated_solve_time")
        if not isinstance(solve_time, int) or solve_time <= 0:
            errors.append(f"{q_label}: 'estimated_solve_time' must be a positive integer (seconds).")
            
        freq = q.get("frequency")
        if freq is not None and (not isinstance(freq, int) or freq <= 0):
            errors.append(f"{q_label}: 'frequency' must be a positive integer.")
            
        ver = q.get("verified")
        if not isinstance(ver, bool):
            errors.append(f"{q_label}: 'verified' must be a boolean.")
            
        year = q.get("exam_year")
        if year is not None and (not isinstance(year, int) or year < 2015 or year > 2030):
            errors.append(f"{q_label}: 'exam_year' must be an integer between 2015 and 2030.")
            
        tags = q.get("tags")
        if not isinstance(tags, list) or not all(isinstance(t, str) for t in tags):
            errors.append(f"{q_label}: 'tags' must be an array of strings.")
            
        ans = q.get("correct_answer")
        if not isinstance(ans, str) or not ans.strip():
            errors.append(f"{q_label}: 'correct_answer' must be a non-empty string.")
            
        # Options & Correct Answer logical validation
        opts = q.get("options")
        if q_type == "MCQ":
            if not isinstance(opts, list) or len(opts) < 2:
                errors.append(f"{q_label}: MCQ type must have an 'options' list with at least 2 items.")
            else:
                option_ids = []
                for o_idx, opt in enumerate(opts):
                    if not isinstance(opt, dict) or "id" not in opt or "text" not in opt:
                        errors.append(f"{q_label}: Option at index {o_idx} must be a dictionary with 'id' and 'text'.")
                    else:
                        option_ids.append(str(opt["id"]))
                
                # Check correct_answer is in options
                if ans not in option_ids:
                    errors.append(f"{q_label}: MCQ correct_answer '{ans}' does not match any option ID in {option_ids}.")
        elif q_type == "Numeric":
            if opts is not None and (isinstance(opts, list) and len(opts) > 0):
                errors.append(f"{q_label}: Numeric type should not have options.")
            # Verify correct_answer can be interpreted as a number
            try:
                float(ans)
            except ValueError:
                errors.append(f"{q_label}: Numeric type correct_answer '{ans}' must be a numeric string.")
                
    # Duplicate Detection based on similarity
    print("Checking for duplicate questions based on text similarity (threshold: 85%)...")
    duplicate_count = 0
    for i in range(len(questions)):
        for j in range(i + 1, len(questions)):
            text_i = questions[i].get("question_text", "")
            text_j = questions[j].get("question_text", "")
            
            # Simple normalization: lowercase and filter alphanumeric
            norm_i = "".join(c.lower() for c in text_i if c.isalnum())
            norm_j = "".join(c.lower() for c in text_j if c.isalnum())
            
            matcher = difflib.SequenceMatcher(None, norm_i, norm_j)
            ratio = matcher.ratio()
            
            if ratio > 0.85:
                print(f" [WARNING] Potential duplicate detected (Similarity: {ratio:.1%}):")
                print(f"   - {questions[i].get('code', f'#{i+1}')}: \"{text_i[:80]}...\"")
                print(f"   - {questions[j].get('code', f'#{j+1}')}: \"{text_j[:80]}...\"")
                duplicate_count += 1
                
    if duplicate_count == 0:
        print("No duplicate questions found.")
    else:
        print(f"Total potential duplicates flagged: {duplicate_count}")

    if errors:
        print(f"\nVerification FAILED with {len(errors)} errors:")
        for err in errors:
            print(f" - {err}")
        return False
        
    print("\nVerification PASSED! All questions are valid and schema-compliant.")
    
    # Print statistics report
    print("\n" + "="*45)
    print("DATABASE STATISTICS REPORT")
    print("="*45)
    print(f"Total Questions: {len(questions)}")
    
    print("\nSection Distribution:")
    for k, v in sorted(sections_count.items()):
        print(f" - {k:<45}: {v:>2} ({v/len(questions):.1%})")
        
    print("\nDifficulty Distribution:")
    for k, v in sorted(difficulties_count.items()):
        print(f" - {k:<45}: {v:>2} ({v/len(questions):.1%})")
        
    print("\nTopic Distribution:")
    for k, v in sorted(topics_count.items(), key=lambda item: item[1], reverse=True):
        print(f" - {k:<45}: {v:>2} ({v/len(questions):.1%})")
    print("="*45 + "\n")
    
    return True

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    questions_file = os.path.join(base_dir, "database", "questions.json")
    success = verify_json(questions_file)
    sys.exit(0 if success else 1)
