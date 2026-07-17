import json
import os

def main():
    questions_file = "database/questions.json"
    if not os.path.exists(questions_file):
        print(f"Error: {questions_file} not found.")
        return

    # Load existing questions
    with open(questions_file, "r", encoding="utf-8") as f:
        questions = json.load(f)

    # Filter out existing Sentence Completion questions to avoid duplicates
    questions = [q for q in questions if q.get("topic") != "Sentence Completion"]

    # Generate 80 high-quality, unique TCS NQT sentence completion questions
    new_questions = []

    # Helper function to construct a question
    def add_mcq(code, text, options_list, correct_id, explanation, subtopic, difficulty, mistakes, tags):
        options = [{"id": chr(65 + i), "text": opt} for i, opt in enumerate(options_list)]
        new_questions.append({
            "code": code,
            "question_text": text,
            "question_image_url": None,
            "options": options,
            "correct_answer": correct_id,
            "explanation": explanation,
            "explanation_image_url": None,
            "topic": "Sentence Completion",
            "subtopic": subtopic,
            "difficulty": difficulty,
            "section": "Verbal Ability",
            "question_type": "MCQ",
            "estimated_solve_time": 25,
            "common_mistakes": mistakes,
            "tags": tags,
            "source": "Original",
            "exam_year": 2024,
            "frequency": 5,
            "verified": True
        })

    def add_typing(code, text, correct_answer, explanation, subtopic, difficulty, mistakes, tags):
        new_questions.append({
            "code": code,
            "question_text": text,
            "question_image_url": None,
            "options": None,
            "correct_answer": correct_answer,
            "explanation": explanation,
            "explanation_image_url": None,
            "topic": "Sentence Completion",
            "subtopic": subtopic,
            "difficulty": difficulty,
            "section": "Verbal Ability",
            "question_type": "Text",
            "estimated_solve_time": 25,
            "common_mistakes": mistakes,
            "tags": tags,
            "source": "Original",
            "exam_year": 2024,
            "frequency": 5,
            "verified": True
        })

    # --- CATEGORY 1: PHRASAL VERBS (20 MCQ Questions) ---
    add_mcq(
        "NQT-SC-0001",
        "Select the word that best fits the meaning of the sentence:\nThe committee decided to ______ the decision until all members could review the audit logs.",
        ["put off", "call off", "carry out", "bring about"],
        "A",
        "The context implies delaying or postponing the decision. 'Put off' means to postpone. 'Call off' means to cancel, which is too permanent since they plan to review it later.",
        "Phrasal Verbs", "Easy",
        "Confusing 'put off' (postpone) with 'call off' (cancel).", ["phrasal-verbs", "grammar"]
    )
    add_mcq(
        "NQT-SC-0002",
        "Select the word that best fits the meaning of the sentence:\nOur engineering team was able to ______ the migration successfully despite server downtime.",
        ["pull through", "carry out", "back out", "turn down"],
        "B",
        "To 'carry out' means to execute or perform a task. This fits the execution of the database migration.",
        "Phrasal Verbs", "Easy",
        "Selecting 'pull through' which means to recover from an illness/difficulty rather than execute a task.", ["phrasal-verbs", "grammar"]
    )
    add_mcq(
        "NQT-SC-0003",
        "Select the word that best fits the meaning of the sentence:\nThe client chose to ______ of the agreement at the eleventh hour, citing budget constraints.",
        ["back out", "run down", "call on", "give in"],
        "A",
        "To 'back out' means to withdraw from a commitment or contract. This fits the context of withdrawing at the last minute.",
        "Phrasal Verbs", "Medium",
        "Confusing 'back out' with 'give in' (surrender).", ["phrasal-verbs", "business-english"]
    )
    add_mcq(
        "NQT-SC-0004",
        "Select the word that best fits the meaning of the sentence:\nThe manager promised to ______ the discrepancy reported in the quarterly transactions.",
        ["look into", "look after", "look up to", "look down on"],
        "A",
        "To 'look into' means to investigate. 'Look after' means to take care of, and 'look up to' means to admire.",
        "Phrasal Verbs", "Easy",
        "Selecting 'look after' instead of the investigative 'look into'.", ["phrasal-verbs", "vocabulary"]
    )
    add_mcq(
        "NQT-SC-0005",
        "Select the word that best fits the meaning of the sentence:\nThe system administrator had to ______ the database service to perform critical updates.",
        ["shut down", "break down", "clear out", "take over"],
        "A",
        "To 'shut down' means to turn off or stop operation of machinery/services. This fits executing updates.",
        "Phrasal Verbs", "Easy",
        "Selecting 'break down' which implies mechanical failure rather than intentional shutdown.", ["phrasal-verbs", "technical-terms"]
    )
    add_mcq(
        "NQT-SC-0006",
        "Select the word that best fits the meaning of the sentence:\nWe need to ______ our resources to meet the aggressive deadline set by the executive sponsor.",
        ["scale up", "phase out", "drop off", "hold back"],
        "A",
        "To 'scale up' means to increase capacity, size, or resources. This is necessary to meet a tight deadline.",
        "Phrasal Verbs", "Easy",
        "Selecting 'phase out' which means to gradually discontinue.", ["phrasal-verbs", "business-english"]
    )
    add_mcq(
        "NQT-SC-0007",
        "Select the word that best fits the meaning of the sentence:\nThe product launch was ______ because the primary API vendor went bankrupt.",
        ["called off", "put through", "set up", "brought up"],
        "A",
        "The bankruptcy of a vendor forces the cancellation of the launch. 'Called off' means canceled.",
        "Phrasal Verbs", "Medium",
        "Selecting 'put through' which means to execute or connect.", ["phrasal-verbs", "vocabulary"]
    )
    add_mcq(
        "NQT-SC-0008",
        "Select the word that best fits the meaning of the sentence:\nIf you run into any validation errors, please ______ the customer support representative.",
        ["call on", "call for", "call in", "call off"],
        "A",
        "To 'call on' means to ask someone for help or to visit them. This fits contacting support.",
        "Phrasal Verbs", "Medium",
        "Confusing 'call on' (request help) with 'call for' (demand/require).", ["phrasal-verbs"]
    )
    add_mcq(
        "NQT-SC-0009",
        "Select the word that best fits the meaning of the sentence:\nOur security team managed to ______ the cyber threat before any user credentials were leaked.",
        ["ward off", "give up", "make up", "bring down"],
        "A",
        "To 'ward off' means to prevent, avert, or repel danger. This fits blocking a cyber threat.",
        "Phrasal Verbs", "Medium",
        "Selecting 'bring down' which means to overthrow or reduce rather than repel.", ["phrasal-verbs", "security"]
    )
    add_mcq(
        "NQT-SC-0010",
        "Select the word that best fits the meaning of the sentence:\nThe senior developer had to ______ the complex architecture diagrams to help the interns understand.",
        ["break down", "build up", "pass on", "run through"],
        "A",
        "To 'break down' means to analyze or explain something complex in simpler parts.",
        "Phrasal Verbs", "Easy",
        "Selecting 'run through' which means to rehearse or read quickly, rather than simplify.", ["phrasal-verbs", "communication"]
    )
    add_mcq(
        "NQT-SC-0011",
        "Select the word that best fits the meaning of the sentence:\nThe project lead had to ______ the team's recommendations due to budget limits.",
        ["turn down", "turn up", "turn over", "turn in"],
        "A",
        "To 'turn down' means to reject or decline an offer or recommendation.",
        "Phrasal Verbs", "Easy",
        "Selecting 'turn over' which means to flip or transfer.", ["phrasal-verbs"]
    )
    add_mcq(
        "NQT-SC-0012",
        "Select the word that best fits the meaning of the sentence:\nAfter weeks of negotiation, the firm was able to ______ the acquisition contract.",
        ["draw up", "draw in", "draw out", "draw back"],
        "A",
        "To 'draw up' means to write or prepare a formal document like a contract.",
        "Phrasal Verbs", "Medium",
        "Selecting 'draw out' which means to prolong or make longer.", ["phrasal-verbs", "business-english"]
    )
    add_mcq(
        "NQT-SC-0013",
        "Select the word that best fits the meaning of the sentence:\nThe software startup had to ______ its cash reserves during the initial phase of development.",
        ["fall back on", "fall out with", "fall through", "fall behind"],
        "A",
        "To 'fall back on' means to use something as a source of support when other things have failed or are unavailable.",
        "Phrasal Verbs", "Medium",
        "Selecting 'fall behind' which means to lag.", ["phrasal-verbs"]
    )
    add_mcq(
        "NQT-SC-0014",
        "Select the word that best fits the meaning of the sentence:\nThe customer decided to ______ the subscription because of poor user interface feedback.",
        ["opt out of", "opt for", "opt in", "opt to"],
        "A",
        "To 'opt out of' means to choose not to participate in or to cancel something.",
        "Phrasal Verbs", "Easy",
        "Selecting 'opt for' which means to choose/prefer something.", ["phrasal-verbs"]
    )
    add_mcq(
        "NQT-SC-0015",
        "Select the word that best fits the meaning of the sentence:\nWe must ______ the outdated mainframe and shift completely to serverless cloud functions.",
        ["phase out", "bring in", "take up", "keep on"],
        "A",
        "To 'phase out' means to gradually stop using something. This fits decommissioning old mainframes.",
        "Phrasal Verbs", "Easy",
        "Selecting 'keep on' which means to continue.", ["phrasal-verbs", "technical-terms"]
    )
    add_mcq(
        "NQT-SC-0016",
        "Select the word that best fits the meaning of the sentence:\nThe management decided to ______ the employees who went above and beyond during the crisis.",
        ["single out", "single down", "single off", "single up"],
        "A",
        "To 'single out' means to choose one person or group from a larger number for special attention or praise.",
        "Phrasal Verbs", "Medium",
        "Selecting 'single off' which is not a standard English phrasal verb.", ["phrasal-verbs"]
    )
    add_mcq(
        "NQT-SC-0017",
        "Select the word that best fits the meaning of the sentence:\nThe sales executive managed to ______ the core features of the product in under three minutes.",
        ["run through", "run down", "run out", "run into"],
        "A",
        "To 'run through' means to read, examine, or explain something quickly.",
        "Phrasal Verbs", "Easy",
        "Selecting 'run down' which means to criticize or lose power.", ["phrasal-verbs"]
    )
    add_mcq(
        "NQT-SC-0018",
        "Select the word that best fits the meaning of the sentence:\nThe operations team is working round the clock to ______ the power outage.",
        ["deal with", "deal out", "deal in", "deal of"],
        "A",
        "To 'deal with' means to take action on or resolve a problem.",
        "Phrasal Verbs", "Easy",
        "Selecting 'deal out' which means to distribute.", ["phrasal-verbs"]
    )
    add_mcq(
        "NQT-SC-0019",
        "Select the word that best fits the meaning of the sentence:\nThe cloud infrastructure was designed to ______ server crashes automatically by spinning up backups.",
        ["cater to", "cope with", "clear up", "hold off"],
        "B",
        "To 'cope with' means to deal effectively with something difficult. Server crashes are difficult events to manage.",
        "Phrasal Verbs", "Medium",
        "Selecting 'cater to' which means to serve or provide for needs rather than handle failure.", ["phrasal-verbs"]
    )
    add_mcq(
        "NQT-SC-0020",
        "Select the word that best fits the meaning of the sentence:\nThe engineering leads met to ______ a robust response strategy to the data breach threat.",
        ["hammer out", "hammer in", "hammer down", "hammer up"],
        "A",
        "To 'hammer out' means to reach an agreement or solution after a lot of discussion or effort.",
        "Phrasal Verbs", "Hard",
        "Selecting 'hammer down' which means to secure or fix in place physically.", ["phrasal-verbs", "idioms"]
    )

    # --- CATEGORY 2: CONJUNCTIONS & TRANSITIONS (20 MCQ Questions) ---
    add_mcq(
        "NQT-SC-0021",
        "Select the word that best fits the meaning of the sentence:\n______ the system integration was completed ahead of schedule, the overall launch was delayed by compliance reviews.",
        ["Although", "Because", "Moreover", "Consequently"],
        "A",
        "The sentence structure shows contrast. 'Although' introduces a concessive clause representing contrast.",
        "Conjunctions", "Easy",
        "Selecting 'Moreover' which is used to add supportive information rather than show contrast.", ["conjunctions", "grammar"]
    )
    add_mcq(
        "NQT-SC-0022",
        "Select the word that best fits the meaning of the sentence:\nThe developer optimized the query performance; ______ , the database load dropped by forty percent.",
        ["consequently", "nevertheless", "on the contrary", "similarly"],
        "A",
        "The second clause is a direct result of the first. 'Consequently' shows a cause-effect relationship.",
        "Conjunctions", "Easy",
        "Selecting 'nevertheless' which shows contrast instead of cause.", ["conjunctions", "grammar"]
    )
    add_mcq(
        "NQT-SC-0023",
        "Select the word that best fits the meaning of the sentence:\nWe will proceed with the vendor contract ______ they agree to deliver the source code escrow.",
        ["provided that", "lest", "in case of", "unless"],
        "A",
        "The sentence specifies a condition. 'Provided that' means 'on the condition that'.",
        "Conjunctions", "Medium",
        "Selecting 'lest' which means 'to prevent the risk of' and is followed by the subjunctive.", ["conjunctions", "conditionals"]
    )
    add_mcq(
        "NQT-SC-0024",
        "Select the word that best fits the meaning of the sentence:\nThe servers must be backup-replicated regularly ______ a catastrophic hardware failure occurs.",
        ["in case", "although", "consequently", "whereas"],
        "A",
        "We replicate servers to prepare for a potential negative event. 'In case' means precaution against a future event.",
        "Conjunctions", "Easy",
        "Selecting 'consequently' which implies the failure has already occurred as a result.", ["conjunctions"]
    )
    add_mcq(
        "NQT-SC-0025",
        "Select the word that best fits the meaning of the sentence:\n______ the high cost of cloud migrations, many traditional firms still prefer on-premise data centers.",
        ["Owing to", "Although", "Whereas", "In spite of"],
        "A",
        "We need a prepositional phrase indicating cause because 'the high cost of cloud migrations' is a noun phrase, not a clause. 'Owing to' means 'due to'.",
        "Conjunctions", "Medium",
        "Selecting 'Although' which must be followed by a full clause (subject + verb).", ["prepositions", "transitions"]
    )
    add_mcq(
        "NQT-SC-0026",
        "Select the word that best fits the meaning of the sentence:\n______ the software is extremely powerful, its steep learning curve deters casual users.",
        ["While", "Because", "Therefore", "Moreover"],
        "A",
        "The sentence introduces contrast. 'While' can mean 'although' when placed at the start of a contrastive statement.",
        "Conjunctions", "Easy",
        "Selecting 'Moreover' which is transitionary and cannot open a dependent clause like this.", ["conjunctions"]
    )
    add_mcq(
        "NQT-SC-0027",
        "Select the word that best fits the meaning of the sentence:\nThe team worked diligently to fix the critical bugs ______ the product would launch bug-free.",
        ["so that", "lest", "in order to", "because of"],
        "A",
        "The sentence describes purpose. 'So that' is followed by a clause expressing the goal or purpose.",
        "Conjunctions", "Easy",
        "Selecting 'in order to' which must be followed by a base verb, not a clause ('the product would launch').", ["conjunctions", "grammar"]
    )
    add_mcq(
        "NQT-SC-0028",
        "Select the word that best fits the meaning of the sentence:\nYou cannot access the production server console ______ you have been granted administrative privileges.",
        ["unless", "if", "provided", "otherwise"],
        "A",
        "This is a negative conditional. 'Unless' means 'except if' or 'if not'.",
        "Conjunctions", "Easy",
        "Selecting 'otherwise' which is a transition adverb and cannot link clauses directly.", ["conjunctions", "grammar"]
    )
    add_mcq(
        "NQT-SC-0029",
        "Select the word that best fits the meaning of the sentence:\nThe project was completed on time ______ the severe resource shortage and server crashes.",
        ["despite", "although", "even though", "whereas"],
        "A",
        "'Despite' is a preposition and is followed by a noun phrase ('the severe resource shortage...'). 'Although' and 'even though' must be followed by a clause.",
        "Conjunctions", "Medium",
        "Confusing the preposition 'despite' with the conjunctions 'although'/'even though'.", ["conjunctions", "prepositions"]
    )
    add_mcq(
        "NQT-SC-0030",
        "Select the word that best fits the meaning of the sentence:\nWe must encrypt all sensitive logs ______ they be intercepted by unauthorized parties.",
        ["lest", "in case", "so that", "unless"],
        "A",
        "'Lest' is used to prevent a negative outcome and is followed by a subjunctive verb phrase ('they be intercepted').",
        "Conjunctions", "Hard",
        "Selecting 'in case' which would require the indicative form ('they are intercepted' or 'they should be intercepted').", ["conjunctions", "subjunctive"]
    )
    add_mcq(
        "NQT-SC-0031",
        "Select the word that best fits the meaning of the sentence:\nThe frontend architecture is highly modular; ______ , the backend service is monolithic.",
        ["conversely", "furthermore", "subsequently", "accordingly"],
        "A",
        "The sentence contrasts two different styles (modular vs monolithic). 'Conversely' shows direct opposition.",
        "Conjunctions", "Medium",
        "Selecting 'furthermore' which adds similar points rather than contrasting points.", ["conjunctions", "vocabulary"]
    )
    add_mcq(
        "NQT-SC-0032",
        "Select the word that best fits the meaning of the sentence:\nThe network connection dropped; ______ , the file transfer operation was terminated immediately.",
        ["consequently", "nevertheless", "otherwise", "meanwhile"],
        "A",
        "The termination is a direct result of the connection drop. 'Consequently' shows result.",
        "Conjunctions", "Easy",
        "Selecting 'nevertheless' which indicates contrast.", ["conjunctions"]
    )
    add_mcq(
        "NQT-SC-0033",
        "Select the word that best fits the meaning of the sentence:\n______ had the new software update been deployed than the monitoring tools flagged a memory leak.",
        ["No sooner", "Hardly", "Scarcely", "Barely"],
        "A",
        "The correlative structure is 'No sooner ... than'. 'Hardly', 'Scarcely', and 'Barely' take 'when' instead of 'than'.",
        "Conjunctions", "Hard",
        "Using 'Hardly' with 'than' (Hardly requires 'when').", ["grammar", "inversion"]
    )
    add_mcq(
        "NQT-SC-0034",
        "Select the word that best fits the meaning of the sentence:\n______ did the team resolve the load balancer issues when the database disk space reached full capacity.",
        ["Hardly", "No sooner", "Not only", "Seldom"],
        "A",
        "The correlative structure here is 'Hardly ... when'. This is an inversion showing immediate sequential events.",
        "Conjunctions", "Hard",
        "Using 'No sooner' with 'when' (No sooner requires 'than').", ["grammar", "inversion"]
    )
    add_mcq(
        "NQT-SC-0035",
        "Select the word that best fits the meaning of the sentence:\nWe will launch the service tomorrow ______ any critical vulnerabilities are uncovered during tonight's scanning.",
        ["unless", "provided", "if", "lest"],
        "A",
        "Negative condition: we will launch except if ('unless') vulnerabilities are found.",
        "Conjunctions", "Easy",
        "Selecting 'lest' which means 'for fear that' and doesn't fit the conditional tense structure.", ["conjunctions"]
    )
    add_mcq(
        "NQT-SC-0036",
        "Select the word that best fits the meaning of the sentence:\n______ the security patch was installed, we noticed a minor latency overhead in API responses.",
        ["Once", "Until", "Lest", "Although"],
        "A",
        "'Once' means 'as soon as' or 'after'. It describes the time trigger for the latency observation.",
        "Conjunctions", "Easy",
        "Selecting 'Lest' which indicates fear/prevention of an outcome.", ["conjunctions"]
    )
    add_mcq(
        "NQT-SC-0037",
        "Select the word that best fits the meaning of the sentence:\nThe server infrastructure is extremely resilient; ______ , it is cost-effective to operate.",
        ["moreover", "nonetheless", "conversely", "otherwise"],
        "A",
        "The second point adds positive value to the first. 'Moreover' is used to introduce additional supporting arguments.",
        "Conjunctions", "Easy",
        "Selecting 'nonetheless' which implies contrast.", ["conjunctions"]
    )
    add_mcq(
        "NQT-SC-0038",
        "Select the word that best fits the meaning of the sentence:\n______ there is a backup plan, we cannot risk migrating the server tonight.",
        ["Unless", "Provided", "Supposing", "Since"],
        "A",
        "Negative conditional: we cannot risk it if there is no backup plan ('Unless there is a backup plan').",
        "Conjunctions", "Easy",
        "Selecting 'Provided' which would make the migration sound safe to do without a backup.", ["conjunctions", "grammar"]
    )
    add_mcq(
        "NQT-SC-0039",
        "Select the word that best fits the meaning of the sentence:\n______ the client demands a changes list, we will proceed with the baseline blueprint.",
        ["Except if", "In spite of", "Due to", "Although"],
        "A",
        "'Except if' functions as a negative conditional similar to 'unless' and fits the dependent clause structure.",
        "Conjunctions", "Medium",
        "Selecting 'In spite of' which must be followed by a noun phrase.", ["conjunctions"]
    )
    add_mcq(
        "NQT-SC-0040",
        "Select the word that best fits the meaning of the sentence:\nWe decided to purchase premium support licenses ______ we experience any extended downtime in production.",
        ["lest", "consequently", "whereas", "in case"],
        "D",
        "We buy support beforehand to prepare for potential future events. 'In case' expresses precaution.",
        "Conjunctions", "Medium",
        "Selecting 'lest' which implies buying support will somehow cause the downtime or is meant to directly prevent it.", ["conjunctions"]
    )

    # --- CATEGORY 3: ADVANCED VOCABULARY (20 MCQ Questions) ---
    add_mcq(
        "NQT-SC-0041",
        "Select the word that best fits the meaning of the sentence:\nThe auditor identified several ______ entries in the database logs that did not correspond to any known transactions.",
        ["anomalous", "pristine", "lucrative", "redundant"],
        "A",
        "'Anomalous' means deviating from what is standard, normal, or expected. This fits unexplained entries.",
        "Vocabulary Context", "Medium",
        "Selecting 'redundant' which means duplicate, rather than irregular or unexplained.", ["vocabulary", "auditing"]
    )
    add_mcq(
        "NQT-SC-0042",
        "Select the word that best fits the meaning of the sentence:\nDue to the developer's ______ attention to detail, the software launch went through with zero high-severity bugs.",
        ["meticulous", "transient", "ambiguous", "superficial"],
        "A",
        "'Meticulous' means showing great attention to detail; very careful and precise.",
        "Vocabulary Context", "Easy",
        "Selecting 'ambiguous' which means unclear or open to multiple interpretations.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0043",
        "Select the word that best fits the meaning of the sentence:\nThe temporary network spike was ______ ; the bandwidth returned to its normal baseline within seconds.",
        ["transient", "pristine", "obsolete", "resilient"],
        "A",
        "'Transient' means lasting only for a short time; impermanent. This fits a spike resolving in seconds.",
        "Vocabulary Context", "Medium",
        "Selecting 'resilient' which describes the ability to recover, rather than the short-lived nature of the event.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0044",
        "Select the word that best fits the meaning of the sentence:\nThe company signed a ______ contract that guaranteed substantial revenues for the next five fiscal years.",
        ["lucrative", "redundant", "sparse", "nominal"],
        "A",
        "'Lucrative' means producing a great deal of profit. This matches 'substantial revenues'.",
        "Vocabulary Context", "Easy",
        "Selecting 'nominal' which means very small or existing in name only.", ["vocabulary", "business-english"]
    )
    add_mcq(
        "NQT-SC-0045",
        "Select the word that best fits the meaning of the sentence:\nThe requirements document was ______ , leading to conflicting interpretations among the development team.",
        ["ambiguous", "meticulous", "explicit", "coherent"],
        "A",
        "'Ambiguous' means open to more than one interpretation; having a double meaning. This causes conflicts.",
        "Vocabulary Context", "Easy",
        "Selecting 'explicit' which is the exact opposite (clear and detail-oriented).", ["vocabulary", "business-english"]
    )
    add_mcq(
        "NQT-SC-0046",
        "Select the word that best fits the meaning of the sentence:\nCloud microservices are highly ______ ; if one service crashes, the rest of the application continues to run.",
        ["resilient", "volatile", "sparse", "redundant"],
        "A",
        "'Resilient' means able to withstand or recover quickly from difficult conditions. This fits the description.",
        "Vocabulary Context", "Easy",
        "Selecting 'volatile' which means unstable or likely to change for the worse.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0047",
        "Select the word that best fits the meaning of the sentence:\nThis legacy library has become ______ and is no longer supported by modern runtime engines.",
        ["obsolete", "lucrative", "dynamic", "pristine"],
        "A",
        "'Obsolete' means out of date or no longer produced or used. This fits unsupported legacy code.",
        "Vocabulary Context", "Easy",
        "Selecting 'pristine' which means in its original, clean condition.", ["vocabulary", "technical-terms"]
    )
    add_mcq(
        "NQT-SC-0048",
        "Select the word that best fits the meaning of the sentence:\nThe DBA noticed a huge ______ between the physical records and the automated database transaction counts.",
        ["discrepancy", "agreement", "congruence", "analogy"],
        "A",
        "'Discrepancy' means a lack of compatibility or similarity between two or more facts. This fits mismatched counts.",
        "Vocabulary Context", "Easy",
        "Selecting 'congruence' which means agreement or compatibility.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0049",
        "Select the word that best fits the meaning of the sentence:\nThe system has many ______ checks, which slows down the processing speed unnecessarily.",
        ["redundant", "lucrative", "meticulous", "anomalous"],
        "A",
        "'Redundant' means not or no longer needed or useful; superfluous. In software, redundant checks repeat calculations.",
        "Vocabulary Context", "Easy",
        "Selecting 'anomalous' which means irregular, whereas here the checks are repetitive, not irregular.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0050",
        "Select the word that best fits the meaning of the sentence:\nAfter hours of debate, the executives finally reached a ______ on the database migration roadmap.",
        ["consensus", "discrepancy", "contention", "altercation"],
        "A",
        "'Consensus' means a general agreement. Reaching a consensus resolves debates.",
        "Vocabulary Context", "Easy",
        "Selecting 'contention' which means disagreement or assertion.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0051",
        "Select the word that best fits the meaning of the sentence:\nThe patch was deployed to ______ the high CPU utilization issues observed on the production servers.",
        ["alleviate", "exacerbate", "aggravate", "transgress"],
        "A",
        "'Alleviate' means to make a problem less severe or make it more bearable.",
        "Vocabulary Context", "Medium",
        "Selecting 'exacerbate' or 'aggravate' which mean to make the problem worse.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0052",
        "Select the word that best fits the meaning of the sentence:\nUsing unencrypted connections will only ______ the existing security vulnerabilities in our application.",
        ["exacerbate", "mitigate", "alleviate", "pacify"],
        "A",
        "'Exacerbate' means to make a problem or bad situation worse. Unencrypted connections worsen vulnerabilities.",
        "Vocabulary Context", "Medium",
        "Selecting 'mitigate' which means to make less severe.", ["vocabulary", "security"]
    )
    add_mcq(
        "NQT-SC-0053",
        "Select the word that best fits the meaning of the sentence:\nThe DevOps team sought to ______ their staging and production configurations into a unified YAML script.",
        ["consolidate", "disperse", "segregate", "fragment"],
        "A",
        "'Consolidate' means to combine a number of financial or physical things into a single more effective or coherent whole.",
        "Vocabulary Context", "Easy",
        "Selecting 'segregate' or 'fragment' which mean to separate or break apart.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0054",
        "Select the word that best fits the meaning of the sentence:\nTo meet the client's urgent timeline, we must ______ the procurement of the software licenses.",
        ["expedite", "defer", "impede", "procrastinate"],
        "A",
        "'Expedite' means to make an action or process happen sooner or be accomplished more quickly.",
        "Vocabulary Context", "Easy",
        "Selecting 'defer' which means to postpone or delay.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0055",
        "Select the word that best fits the meaning of the sentence:\nThe manager's approach to the budget crisis was ______ ; she cut costs immediately rather than planning complex reorganizations.",
        ["pragmatic", "idealistic", "esoteric", "arbitrary"],
        "A",
        "'Pragmatic' means dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.",
        "Vocabulary Context", "Medium",
        "Selecting 'idealistic' which involves pursuing high principles rather than practical ones.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0056",
        "Select the word that best fits the meaning of the sentence:\nThe network security metrics showed a ______ improvement after the firewall rules were optimized.",
        ["perceptible", "nominal", "negligible", "futile"],
        "A",
        "'Perceptible' means able to be seen or noticed. This matches a clear, visible improvement.",
        "Vocabulary Context", "Medium",
        "Selecting 'negligible' which means too small to be important or noticed.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0057",
        "Select the word that best fits the meaning of the sentence:\nThe startup's business plan was deemed ______ because they lacked a stable stream of customer acquisitions.",
        ["precarious", "lucrative", "resilient", "impervious"],
        "A",
        "'Precarious' means not securely held or in position; dangerously likely to fall or collapse.",
        "Vocabulary Context", "Hard",
        "Selecting 'impervious' which means unable to be affected.", ["vocabulary", "business-english"]
    )
    add_mcq(
        "NQT-SC-0058",
        "Select the word that best fits the meaning of the sentence:\nThe software architect gave an ______ explanation of the microservices design, leaving many junior coders confused.",
        ["esoteric", "explicit", "lucid", "elementary"],
        "A",
        "'Esoteric' means intended for or likely to be understood by only a small number of people with a specialized knowledge.",
        "Vocabulary Context", "Hard",
        "Selecting 'lucid' which means clear and easy to understand.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0059",
        "Select the word that best fits the meaning of the sentence:\nWe must not make ______ decisions without consulting the database administrator regarding storage impact.",
        ["arbitrary", "deliberate", "pragmatic", "calculating"],
        "A",
        "'Arbitrary' means based on random choice or personal whim, rather than any reason or system.",
        "Vocabulary Context", "Medium",
        "Selecting 'deliberate' which means planned and reasoned.", ["vocabulary"]
    )
    add_mcq(
        "NQT-SC-0060",
        "Select the word that best fits the meaning of the sentence:\nThe team leader remained ______ during the severe production outage, systematically guiding the developers through recovery steps.",
        ["unflappable", "irascible", "capricious", "apathetic"],
        "A",
        "'Unflappable' means having or showing calmness in a crisis. This matches 'systematically guiding recovery'.",
        "Vocabulary Context", "Hard",
        "Selecting 'irascible' which means easily angered, or 'capricious' which means unstable/moody.", ["vocabulary"]
    )

    # --- CATEGORY 4: TYPING QUESTIONS (Sentence Completion - 20 Questions) ---
    add_typing(
        "NQT-SC-0061",
        "Fill in the blank with a single appropriate word:\nThe system administrator had to ______ the database service to perform critical updates.",
        "restart",
        "To 'restart' or 'reboot' is the standard action performed after applying critical updates to database services. The word 'restart' best fits.",
        "Tech-Vocabulary", "Easy",
        "Typing 'stop' which does not complete the post-update recovery cycle.", ["vocabulary"]
    )
    add_typing(
        "NQT-SC-0062",
        "Fill in the blank with a single appropriate word:\nAlthough the team worked hard, they could not prevent the database from going ______ during peak traffic hours.",
        "offline",
        "Database servers go 'offline' or experience downtime during load spikes. 'offline' is the most standard word here.",
        "Vocabulary Context", "Easy",
        "Typing 'bad' or 'wrong' which are colloquial and grammatically awkward.", ["vocabulary"]
    )
    add_typing(
        "NQT-SC-0063",
        "Fill in the blank with a single appropriate word:\nDue to the severe weather warnings, the conference organizer decided to ______ the event to next month.",
        "postpone",
        "Rescheduling to a later date is described by the verb 'postpone' or 'defer'.",
        "Vocabulary Context", "Easy",
        "Typing 'cancel' which conflicts with the statement that it is moved 'to next month'.", ["vocabulary"]
    )
    add_typing(
        "NQT-SC-0064",
        "Fill in the blank with a single appropriate word:\nTo comply ______ the new government regulations, we must update our user data encryption algorithm.",
        "with",
        "The preposition 'comply' always collocates with the preposition 'with'. 'Comply with' is the correct construction.",
        "Prepositions", "Easy",
        "Typing 'to' (which is used with 'adhere' or 'conform' instead).", ["prepositions", "collocations"]
    )
    add_typing(
        "NQT-SC-0065",
        "Fill in the blank with a single appropriate word:\nThe software license is contingent ______ the completion of the payment schedule by next week.",
        "upon",
        "The phrase 'contingent upon' (or 'contingent on') is a standard prepositional collocation meaning dependent on.",
        "Prepositions", "Medium",
        "Typing 'with' or 'to' which are grammatically incorrect collocations for contingent.", ["prepositions", "collocations"]
    )
    add_typing(
        "NQT-SC-0066",
        "Fill in the blank with a single appropriate word:\nWe must adhere ______ the coding standards defined in the project guidelines.",
        "to",
        "The verb 'adhere' always takes the preposition 'to'.",
        "Prepositions", "Easy",
        "Using 'with' (comply with) instead of 'to'.", ["prepositions"]
    )
    add_typing(
        "NQT-SC-0067",
        "Fill in the blank with a single appropriate word:\nThe software architect is indifferent ______ which cloud provider is selected as long as it supports Kubernetes.",
        "to",
        "The adjective 'indifferent' takes the preposition 'to' when describing lack of interest or preference.",
        "Prepositions", "Medium",
        "Using 'about' or 'with' instead of the standard 'indifferent to'.", ["prepositions"]
    )
    add_typing(
        "NQT-SC-0068",
        "Fill in the blank with a single appropriate word:\nPrachi is highly proficient ______ Java programming and microservices deployment.",
        "in",
        "One is 'proficient in' a language or skill. 'Proficient at' is also used but 'in' is standard for NQT contexts.",
        "Prepositions", "Easy",
        "Using 'with' instead of 'in'.", ["prepositions"]
    )
    add_typing(
        "NQT-SC-0069",
        "Fill in the blank with a single appropriate word:\nHer arguments were consistent ______ the official strategy guidelines published by the executive board.",
        "with",
        "'Consistent with' is the standard prepositional collocation.",
        "Prepositions", "Easy",
        "Using 'to' instead of 'with'.", ["prepositions"]
    )
    add_typing(
        "NQT-SC-0070",
        "Fill in the blank with a single appropriate word:\nWe must abstain ______ making unauthorized changes to the production server configuration.",
        "from",
        "The verb 'abstain' is followed by the preposition 'from'.",
        "Prepositions", "Easy",
        "Using 'to' or 'with' instead of 'from'.", ["prepositions"]
    )
    add_typing(
        "NQT-SC-0071",
        "Fill in the blank with a single appropriate word:\nThe system is prone ______ memory leaks if the file streams are not closed properly.",
        "to",
        "'Prone to' is the standard idiom meaning susceptible to.",
        "Prepositions", "Easy",
        "Using 'for' or 'with' instead of 'to'.", ["prepositions"]
    )
    add_typing(
        "NQT-SC-0072",
        "Fill in the blank with a single appropriate word:\nThe team leader demanded that he ______ the source code before leaving for the weekend.",
        "submit",
        "This requires the subjunctive mode due to the demand verb. 'Demanded that he submit' (base verb) is correct, not 'submits' or 'submitted'.",
        "Grammar Mode", "Hard",
        "Typing 'submits' which violates the subjunctive requirement.", ["grammar", "subjunctive"]
    )
    add_typing(
        "NQT-SC-0073",
        "Fill in the blank with a single appropriate word:\nIt is crucial that she ______ present at the executive meeting tomorrow to explain the roadmap.",
        "be",
        "Subjunctive mood after adjectives of urgency ('It is crucial that...'). The base verb 'be' must be used.",
        "Grammar Mode", "Hard",
        "Typing 'is' or 'was' which are indicative forms, not subjunctive.", ["grammar", "subjunctive"]
    )
    add_typing(
        "NQT-SC-0074",
        "Fill in the blank with a single appropriate word:\nIf we ______ known about the server migration earlier, we would have postponed our tests.",
        "had",
        "This is a third conditional clause: 'If + subject + past perfect, subject + would have + past participle'. We need the helper 'had'.",
        "Grammar Mode", "Medium",
        "Typing 'would' or 'have' directly which breaks the past perfect construction.", ["grammar", "conditionals"]
    )
    add_typing(
        "NQT-SC-0075",
        "Fill in the blank with a single appropriate word:\nNeither the developer nor the project manager ______ authorized to sign the production release order.",
        "is",
        "With 'neither... nor...', the verb agrees with the closer subject ('project manager' - singular). Thus, we use 'is' (or 'was').",
        "Grammar Agreement", "Medium",
        "Using 'are' because there are two subjects mentioned.", ["grammar", "subject-verb-agreement"]
    )
    add_typing(
        "NQT-SC-0076",
        "Fill in the blank with a single appropriate word:\nEither the system logs or the network packet report ______ the source of the latency issue.",
        "contains",
        "With 'either... or...', the verb agrees with the closer subject ('network packet report' - singular). We use the singular verb 'contains'.",
        "Grammar Agreement", "Medium",
        "Using the plural verb 'contain'.", ["grammar", "subject-verb-agreement"]
    )
    add_typing(
        "NQT-SC-0077",
        "Fill in the blank with a single appropriate word:\nThe database administrator, along with several developers, ______ attending the AWS cloud summit today.",
        "is",
        "The subject is 'database administrator'. Parenthetical expressions like 'along with...' do not change the number of the subject. Use the singular 'is'.",
        "Grammar Agreement", "Medium",
        "Using 'are' due to the inclusion of 'several developers'.", ["grammar", "subject-verb-agreement"]
    )
    add_typing(
        "NQT-SC-0078",
        "Fill in the blank with a single appropriate word:\nThe number of database optimization tickets ______ increased significantly this month.",
        "has",
        "'The number of...' takes a singular verb. (Conversely, 'A number of...' takes a plural verb). We use 'has'.",
        "Grammar Agreement", "Hard",
        "Using 'have' because 'tickets' is plural.", ["grammar", "subject-verb-agreement"]
    )
    add_typing(
        "NQT-SC-0079",
        "Fill in the blank with a single appropriate word:\nA number of developers ______ reported issues connecting to the staging server console.",
        "have",
        "'A number of...' takes a plural verb. We use 'have'.",
        "Grammar Agreement", "Hard",
        "Using 'has' because they treat 'number' as singular.", ["grammar", "subject-verb-agreement"]
    )
    add_typing(
        "NQT-SC-0080",
        "Fill in the blank with a single appropriate word:\nI look forward to ______ the updated API integrations next Monday.",
        "testing",
        "To 'look forward to' is followed by a gerund (verb + -ing), not a base infinitive. Thus, 'testing' is correct.",
        "Grammar Gerund", "Medium",
        "Typing the infinitive 'test' instead of the gerund 'testing'.", ["grammar", "gerund"]
    )

    print(f"Generated {len(new_questions)} new Sentence Completion questions.")

    # Merge questions
    questions.extend(new_questions)

    # Save questions back to file
    with open(questions_file, "w", encoding="utf-8") as f:
        json.dump(questions, f, indent=2)

    print(f"Successfully updated database/questions.json. Total questions in bank: {len(questions)}")

if __name__ == "__main__":
    main()
