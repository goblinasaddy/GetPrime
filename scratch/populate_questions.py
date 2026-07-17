# populate_questions.py
# Python script to generate 50 high-quality TCS NQT questions in database/questions.json

import json
import os

questions = []

# --- NUMERICAL ABILITY (20 Questions) ---

# Q1
questions.append({
    "code": "NQT-0001",
    "question_text": "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "120 m"},
        {"id": "B", "text": "240 m"},
        {"id": "C", "text": "300 m"},
        {"id": "D", "text": "360 m"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Convert the speed of the train from km/hr to m/s.\nSpeed = 54 km/hr = 54 * (5/18) m/s = 3 * 5 = 15 m/s.\n\nStep 2: Find the length of the train.\nWhen a train passes a standing man, the distance covered is equal to the length of the train.\nLength of Train = Speed * Time to pass the man\nLength of Train = 15 m/s * 20 seconds = 300 meters.\n\nStep 3: Find the length of the platform.\nWhen a train passes a platform, the total distance covered is the sum of the train length and the platform length.\nLet the platform length be L.\nTotal Distance = 300 + L.\nTime to pass the platform = 36 seconds.\nSpeed = Total Distance / Time\n15 = (300 + L) / 36\n300 + L = 15 * 36\n300 + L = 540\nL = 540 - 300 = 240 meters.\n\nTherefore, the length of the platform is 240 m.",
    "explanation_image_url": None,
    "topic": "Time Speed and Distance",
    "subtopic": "Trains",
    "difficulty": "Medium",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 75,
    "common_mistakes": "Forgetting to convert speed from km/hr to m/s, or using the train length directly as the answer.",
    "tags": ["trains", "speed-conversion", "arithmetic"],
    "source": "Inspired",
    "exam_year": 2024,
    "frequency": 4,
    "verified": True
})

# Q2
questions.append({
    "code": "NQT-0002",
    "question_text": "Find the least number which when divided by 12, 16, 18, and 30 leaves a remainder of 4 in each case, but when divided by 7 leaves no remainder.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "364"},
        {"id": "B", "text": "724"},
        {"id": "C", "text": "1084"},
        {"id": "D", "text": "2884"}
    ],
    "correct_answer": "D",
    "explanation": "Step-by-step Solution:\n\nStep 1: Find the LCM of the divisors 12, 16, 18, and 30.\n- Prime factorization of 12 = 2^2 * 3\n- Prime factorization of 16 = 2^4\n- Prime factorization of 18 = 2 * 3^2\n- Prime factorization of 30 = 2 * 3 * 5\nLCM = 2^4 * 3^2 * 5 = 16 * 9 * 5 = 720.\n\nStep 2: Express the required number in terms of the LCM.\nAny number leaving a remainder of 4 when divided by 12, 16, 18, and 30 is of the form: \nNumber = 720k + 4 (where k is a positive integer).\n\nStep 3: Find the value of k such that (720k + 4) is exactly divisible by 7.\nWe can write 720k + 4 as:\n(7 * 102k) + 6k + 4 = 714k + 6k + 4.\nSince 714k is divisible by 7, we only need to find a value of k for which (6k + 4) is divisible by 7:\n- For k = 1: 6(1) + 4 = 10 (Not divisible by 7)\n- For k = 2: 6(2) + 4 = 16 (Not divisible by 7)\n- For k = 3: 6(3) + 4 = 22 (Not divisible by 7)\n- For k = 4: 6(4) + 4 = 28 (Divisible by 7: 28 / 7 = 4)\n\nStep 4: Substitute k = 4 into the original formula.\nNumber = 720 * 4 + 4 = 2880 + 4 = 2884.\n\nTherefore, the least number is 2884.",
    "explanation_image_url": None,
    "topic": "Number System",
    "subtopic": "HCF and LCM",
    "difficulty": "Hard",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 90,
    "common_mistakes": "Calculating LCM incorrectly or picking 364 (which works for 12, 18, 30 but not 16).",
    "tags": ["lcm-hcf", "divisibility", "number-theory"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 3,
    "verified": True
})

# Q3
questions.append({
    "code": "NQT-0003",
    "question_text": "Pipe A can fill a tank in 12 hours and Pipe B can fill it in 15 hours. If both pipes are opened together and Pipe A is closed after 4 hours, how much additional time (in hours) will Pipe B take to fill the remaining part of the tank?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "5 hours"},
        {"id": "B", "text": "6 hours"},
        {"id": "C", "text": "8 hours"},
        {"id": "D", "text": "9 hours"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Calculate the total capacity of the tank and efficiencies.\nLet the capacity of the tank be the LCM of 12 and 15 = 60 units.\n- Efficiency of Pipe A = 60 / 12 = 5 units/hour\n- Efficiency of Pipe B = 60 / 15 = 4 units/hour\n\nStep 2: Find the work done while both pipes are open.\nCombined efficiency of A and B = 5 + 4 = 9 units/hour.\nWork done in 4 hours = 9 units/hour * 4 hours = 36 units.\n\nStep 3: Calculate the remaining work.\nRemaining capacity = 60 - 36 = 24 units.\n\nStep 4: Find the additional time taken by Pipe B to fill the remaining capacity.\nAdditional time = Remaining capacity / Efficiency of Pipe B\nAdditional time = 24 units / 4 units/hour = 6 hours.\n\nTherefore, Pipe B will take 6 additional hours to fill the tank.",
    "explanation_image_url": None,
    "topic": "Time and Work",
    "subtopic": "Pipes and Cisterns",
    "difficulty": "Easy",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 60,
    "common_mistakes": "Calculating total time instead of additional time (total time is 4 + 6 = 10 hours).",
    "tags": ["time-and-work", "pipes-cisterns", "arithmetic"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q4
questions.append({
    "code": "NQT-0004",
    "question_text": "The difference between simple interest and compound interest (compounded annually) on a certain sum of money for 2 years at 8% per annum is $48. Find the principal sum.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "$7,500"},
        {"id": "B", "text": "$6,000"},
        {"id": "C", "text": "$8,000"},
        {"id": "D", "text": "$7,200"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Identify the standard formula for the difference between CI and SI for 2 years.\nDifference (D) = P * (R / 100)^2\nwhere P is the principal sum and R is the rate of interest.\n\nStep 2: Substitute the given values into the formula.\nHere, D = $48, R = 8%.\n48 = P * (8 / 100)^2\n\nStep 3: Solve for P.\n48 = P * (64 / 10,000)\nP = (48 * 10,000) / 64\nP = 480,000 / 64\nP = 7,500.\n\nTherefore, the principal sum is $7,500.",
    "explanation_image_url": None,
    "topic": "Simple and Compound Interest",
    "subtopic": "Interest Difference",
    "difficulty": "Medium",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 70,
    "common_mistakes": "Using the 3-year formula instead of the 2-year formula or mixing up the terms in the formula.",
    "tags": ["interest", "compound-interest", "arithmetic"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 4,
    "verified": True
})

# Q5
questions.append({
    "code": "NQT-0005",
    "question_text": "A dishonest dealer claims to sell his goods at cost price, but he uses a weight of 920 grams instead of a 1 kg weight. What is his percentage profit?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "8%"},
        {"id": "B", "text": "8.69%"},
        {"id": "C", "text": "8.33%"},
        {"id": "D", "text": "9%"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Identify the true weight and the false weight.\n- True weight = 1000 grams\n- False weight used = 920 grams\n- Error (weight saved by dealer) = 1000 - 920 = 80 grams\n\nStep 2: Use the profit percentage formula for cheating dealers.\nProfit % = (Error / False Weight) * 100\nProfit % = (80 / 920) * 100\n\nStep 3: Perform calculations.\nProfit % = (8 / 92) * 100\nProfit % = (2 / 23) * 100 = 200 / 23 = 8.695% ~ 8.69%.\n\nTherefore, the dealer's profit percentage is 8.69%.",
    "explanation_image_url": None,
    "topic": "Profit and Loss",
    "subtopic": "Cheating Dealer",
    "difficulty": "Medium",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 65,
    "common_mistakes": "Calculating profit percentage over the 1000g base (80 / 1000 = 8%) instead of the actual goods given out (920g).",
    "tags": ["profit-loss", "percentage", "arithmetic"],
    "source": "Faculty Contributed",
    "exam_year": 2024,
    "frequency": 3,
    "verified": True
})

# Q6
questions.append({
    "code": "NQT-0006",
    "question_text": "An article is listed at $1,500. Two successive discounts of 20% and 10% are offered. What is the final selling price of the article?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "$1,050"},
        {"id": "B", "text": "$1,080"},
        {"id": "C", "text": "$1,100"},
        {"id": "D", "text": "$1,200"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nMethod 1: Step-by-step calculation\nStep 1: Calculate the price after the first discount of 20%.\nDiscount 1 = 20% of 1500 = 1500 * 0.20 = $300.\nPrice after Discount 1 = 1500 - 300 = $1,200.\n\nStep 2: Calculate the price after the second discount of 10% on the reduced price.\nDiscount 2 = 10% of 1200 = 1200 * 0.10 = $120.\nFinal Selling Price = 1200 - 120 = $1,080.\n\nMethod 2: Single equivalent discount\nStep 1: Find the combined single equivalent discount percentage using the formula:\nEquivalent Discount = d1 + d2 - (d1 * d2 / 100)\nEquivalent Discount = 20 + 10 - (20 * 10 / 100) = 30 - 2 = 28%.\n\nStep 2: Apply the equivalent discount to the original price.\nFinal Selling Price = 1500 * (100% - 28%) = 1500 * 0.72 = $1,080.\n\nTherefore, the final selling price is $1,080.",
    "explanation_image_url": None,
    "topic": "Profit and Loss",
    "subtopic": "Successive Discounts",
    "difficulty": "Easy",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 50,
    "common_mistakes": "Adding the discounts directly (20% + 10% = 30% discount on $1500 = $1050).",
    "tags": ["discounts", "profit-loss", "arithmetic"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q7
questions.append({
    "code": "NQT-0007",
    "question_text": "A and B can complete a work in 10 days and 15 days respectively. They work on alternate days starting with A. In how many days will the work be completed?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "11 days"},
        {"id": "B", "text": "12 days"},
        {"id": "C", "text": "12.5 days"},
        {"id": "D", "text": "13 days"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Determine the total work and individual efficiencies.\nLet the total work be the LCM of 10 and 15 = 30 units.\n- Efficiency of A = 30 / 10 = 3 units/day\n- Efficiency of B = 30 / 15 = 2 units/day\n\nStep 2: Calculate the work done in one 2-day cycle (alternate working).\n- Day 1 (A works): 3 units\n- Day 2 (B works): 2 units\nTotal work done in 1 cycle (2 days) = 3 + 2 = 5 units.\n\nStep 3: Divide the total work by the work done per cycle.\nNumber of 2-day cycles required = Total work / Work per cycle = 30 / 5 = 6 cycles.\n\nStep 4: Find the total number of days.\nTotal days = 6 cycles * 2 days/cycle = 12 days.\n\nTherefore, the work will be completed in 12 days.",
    "explanation_image_url": None,
    "topic": "Time and Work",
    "subtopic": "Alternate Days",
    "difficulty": "Medium",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 70,
    "common_mistakes": "Incorrect cycle division, or assuming they work together (which would take 6 days total).",
    "tags": ["time-and-work", "alternate-days", "arithmetic"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 4,
    "verified": True
})

# Q8
questions.append({
    "code": "NQT-0008",
    "question_text": "If A's income is 25% more than B's income, by what percentage is B's income less than A's income?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "20%"},
        {"id": "B", "text": "25%"},
        {"id": "C", "text": "16.67%"},
        {"id": "D", "text": "15%"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Assume a base value for B's income.\nLet B's income be $100.\n\nStep 2: Determine A's income.\nSince A's income is 25% more than B's:\nA's income = 100 + 25% of 100 = $125.\n\nStep 3: Calculate the difference in their incomes.\nDifference = A's income - B's income = 125 - 100 = $25.\n\nStep 4: Calculate by what percentage B's income is less than A's income.\nWe compare the difference relative to A's income:\nPercentage Less = (Difference / A's income) * 100\nPercentage Less = (25 / 125) * 100 = (1 / 5) * 100 = 20%.\n\nTherefore, B's income is 20% less than A's income.",
    "explanation_image_url": None,
    "topic": "Percentages",
    "subtopic": "Income Comparison",
    "difficulty": "Easy",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 40,
    "common_mistakes": "Answering 25% directly because A is 25% more than B.",
    "tags": ["percentages", "arithmetic"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q9
questions.append({
    "code": "NQT-0009",
    "question_text": "A, B, and C invest in a partnership in the ratio of 3 : 5 : 7. After 6 months, C withdraws half of his capital. If the total profit at the end of the year is $106,000, what is C's share of the profit?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "$36,000"},
        {"id": "B", "text": "$42,000"},
        {"id": "C", "text": "$40,000"},
        {"id": "D", "text": "$44,000"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Set up the initial investment ratios.\nLet the investments of A, B, and C be 3x, 5x, and 7x.\n\nStep 2: Calculate the weighted investment of each partner (Investment * Time in months).\n- A stays in the partnership for the full 12 months with initial capital:\n  A's product = 3x * 12 = 36x\n- B stays in the partnership for the full 12 months with initial capital:\n  B's product = 5x * 12 = 60x\n- C stays for 6 months with 7x capital, then withdraws half (leaving 3.5x capital) for the remaining 6 months:\n  C's product = (7x * 6) + (3.5x * 6) = 42x + 21x = 63x\n\nStep 3: Find the ratio of profit distribution.\nProfit sharing ratio A : B : C = 36x : 60x : 63x = 36 : 60 : 63.\nDividing by the common factor 3, we get:\nProfit sharing ratio A : B : C = 12 : 20 : 21.\n\nStep 4: Determine C's share of the total profit.\nTotal units of profit = 12 + 20 + 21 = 53 units.\nTotal profit = $106,000.\nValue of 1 unit = 106,000 / 53 = $2,000.\nC's share (21 units) = 21 * 2,000 = $42,000.\n\nTherefore, C's share of the profit is $42,000.",
    "explanation_image_url": None,
    "topic": "Ratio and Proportion",
    "subtopic": "Partnership",
    "difficulty": "Medium",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 80,
    "common_mistakes": "Ignoring the time factor and dividing profit directly in the ratio 3:5:7, or forgetting that C only withdrew half his capital (meaning half remained).",
    "tags": ["ratio-proportion", "partnership", "arithmetic"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 3,
    "verified": True
})

# Q10
questions.append({
    "code": "NQT-0010",
    "question_text": "The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What is the weight of the new person?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "75 kg"},
        {"id": "B", "text": "80 kg"},
        {"id": "C", "text": "85 kg"},
        {"id": "D", "text": "90 kg"}
    ],
    "correct_answer": "C",
    "explanation": "Step-by-step Solution:\n\nStep 1: Understand the effect of the replacement on the total weight.\nSince the average weight of 8 people increases, the new person must weigh more than the person they replaced.\n\nStep 2: Calculate the total weight increase across the group.\nNumber of persons = 8\nIncrease in average weight = 2.5 kg\nTotal weight increase = 8 * 2.5 = 20 kg.\n\nStep 3: Calculate the weight of the new person.\nWeight of new person = Weight of replaced person + Total weight increase\nWeight of new person = 65 kg + 20 kg = 85 kg.\n\nTherefore, the weight of the new person is 85 kg.",
    "explanation_image_url": None,
    "topic": "Averages",
    "subtopic": "Replacement",
    "difficulty": "Easy",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 45,
    "common_mistakes": "Subtracting the weight increase instead of adding it, resulting in 45 kg.",
    "tags": ["averages", "arithmetic"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q11
questions.append({
    "code": "NQT-0011",
    "question_text": "What is the unit digit of the expression (37)^123 * (43)^56 * (57)^89?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "1"},
        {"id": "B", "text": "3"},
        {"id": "C", "text": "7"},
        {"id": "D", "text": "9"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Simplify the base of each term to its unit digit.\nWe only need to find the unit digits of: 7^123 * 3^56 * 7^89.\n\nStep 2: Understand the cyclicity of the unit digits of 7 and 3.\nBoth 7 and 3 have a cyclicity of 4.\n- Unit digits of powers of 7: 7^1=7, 7^2=9, 7^3=3, 7^4=1 (repeats 7, 9, 3, 1)\n- Unit digits of powers of 3: 3^1=3, 3^2=9, 3^3=7, 3^4=1 (repeats 3, 9, 7, 1)\n\nStep 3: Find the unit digit of each term by dividing the exponents by 4.\n- For 7^123: 123 % 4 = 3. Thus, the unit digit is the same as 7^3 = 343, which is 3.\n- For 3^56: 56 % 4 = 0 (perfectly divisible, which maps to index 4). Thus, the unit digit is the same as 3^4 = 81, which is 1.\n- For 7^89: 89 % 4 = 1. Thus, the unit digit is the same as 7^1 = 7.\n\nStep 4: Multiply the unit digits together to get the final unit digit.\nProduct of unit digits = 3 * 1 * 7 = 21.\nThe unit digit of 21 is 1.\n\nTherefore, the unit digit of the entire expression is 1.",
    "explanation_image_url": None,
    "topic": "Number System",
    "subtopic": "Unit Digit",
    "difficulty": "Medium",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 75,
    "common_mistakes": "Forgetting the cyclicity rules, or incorrectly calculating exponents (e.g. thinking 56%4 = 4 instead of remainder 0 which maps to power 4).",
    "tags": ["number-system", "unit-digit", "cyclicity"],
    "source": "Inspired",
    "exam_year": 2024,
    "frequency": 4,
    "verified": True
})

# Q12
questions.append({
    "code": "NQT-0012",
    "question_text": "If 3^(x - y) = 27 and 3^(x + y) = 243, find the value of x * y.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "4"},
        {"id": "B", "text": "5"},
        {"id": "C", "text": "6"},
        {"id": "D", "text": "8"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Convert the equations to have the same base (3).\n- 3^(x - y) = 27 => 3^(x - y) = 3^3\n- 3^(x + y) = 243 => 3^(x + y) = 3^5\n\nStep 2: Equate the exponents to form a system of linear equations.\n1) x - y = 3\n2) x + y = 5\n\nStep 3: Solve the system of equations.\n- Add Equation 1 and Equation 2:\n  (x - y) + (x + y) = 3 + 5\n  2x = 8\n  x = 4.\n- Substitute x = 4 into Equation 2:\n  4 + y = 5\n  y = 1.\n\nStep 4: Find the product x * y.\nx * y = 4 * 1 = 4.\n\nTherefore, the value of x * y is 4.",
    "explanation_image_url": None,
    "topic": "Surds and Indices",
    "subtopic": "Equations with Powers",
    "difficulty": "Easy",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 50,
    "common_mistakes": "Solving for x and y but forgetting to multiply them to get x * y.",
    "tags": ["indices", "algebra", "equations"],
    "source": "Original",
    "exam_year": 2023,
    "frequency": 3,
    "verified": True
})

# Q13
questions.append({
    "code": "NQT-0013",
    "question_text": "In how many different ways can the letters of the word 'CORPORATION' be arranged so that the vowels always come together?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "48,000"},
        {"id": "B", "text": "50,400"},
        {"id": "C", "text": "120,960"},
        {"id": "D", "text": "720"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Identify the vowels and consonants in the word 'CORPORATION'.\nTotal letters = 11.\n- Vowels: O, O, A, I, O (Total = 5 vowels, where 'O' is repeated 3 times)\n- Consonants: C, R, P, R, T, N (Total = 6 consonants, where 'R' is repeated 2 times)\n\nStep 2: Group the vowels together.\nSince the vowels must always come together, we treat the group of 5 vowels (OOAIO) as a single unit or letter.\nNow, we have: 6 consonants + 1 vowel group = 7 units to arrange.\n\nStep 3: Calculate the arrangements of the 7 units.\nIn the 7 units, the consonant 'R' is repeated 2 times.\nNumber of arrangements = 7! / 2!\nNumber of arrangements = 5040 / 2 = 2520.\n\nStep 4: Calculate the arrangements of the vowels within their group.\nWithin the vowel group, there are 5 letters: O, O, A, I, O (where 'O' is repeated 3 times).\nNumber of arrangements = 5! / 3!\nNumber of arrangements = 120 / 6 = 20.\n\nStep 5: Multiply the two results to get the total arrangements.\nTotal ways = 2520 * 20 = 50,400.\n\nTherefore, the letters can be arranged in 50,400 ways.",
    "explanation_image_url": None,
    "topic": "Permutation and Combination",
    "subtopic": "Word Arrangements",
    "difficulty": "Hard",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 90,
    "common_mistakes": "Forgetting to divide by the repeating letters (R twice, O three times) or miscounting the number of consonants and vowels.",
    "tags": ["permutations", "combinatorics", "vowels-together"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 3,
    "verified": True
})

# Q14
questions.append({
    "code": "NQT-0014",
    "question_text": "A bag contains 4 white, 5 red, and 6 blue balls. Three balls are drawn at random from the bag. What is the probability that all of them are red?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "1/22"},
        {"id": "B", "text": "2/91"},
        {"id": "C", "text": "3/22"},
        {"id": "D", "text": "2/77"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Calculate the total number of balls in the bag.\nTotal balls = 4 (white) + 5 (red) + 6 (blue) = 15 balls.\n\nStep 2: Calculate the total number of ways to select any 3 balls out of 15.\nThis is a combination problem: 15C3.\nTotal outcomes = (15 * 14 * 13) / (3 * 2 * 1) = 5 * 7 * 13 = 455.\n\nStep 3: Calculate the number of favorable ways to draw 3 red balls out of the 5 available red balls.\nFavorable outcomes = 5C3 = 5C2 = (5 * 4) / (2 * 1) = 10.\n\nStep 4: Compute the probability.\nProbability = Favorable outcomes / Total outcomes\nProbability = 10 / 455 = 2 / 91.\n\nTherefore, the probability that all three drawn balls are red is 2/91.",
    "explanation_image_url": None,
    "topic": "Probability",
    "subtopic": "Ball Selection",
    "difficulty": "Medium",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 70,
    "common_mistakes": "Calculating probability as (5/15) * (5/15) * (5/15) by assuming replacement, when the draw is done without replacement.",
    "tags": ["probability", "combinations"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 4,
    "verified": True
})

# Q15
questions.append({
    "code": "NQT-0015",
    "question_text": "A metallic sphere of radius 6 cm is melted and recast into a wire of cylinder cross-section with radius 0.2 cm. Find the length of the wire (in meters).",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "72 m"},
        {"id": "B", "text": "144 m"},
        {"id": "C", "text": "288 m"},
        {"id": "D", "text": "18 m"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Understand that melting and recasting preserves the total volume of metal.\nVolume of Sphere = Volume of Cylindrical Wire.\n\nStep 2: Calculate the volume of the metallic sphere.\nVolume of sphere = (4/3) * pi * R^3\nGiven R = 6 cm:\nVolume = (4/3) * pi * 6 * 6 * 6 = 4 * pi * 2 * 36 = 288 * pi cm^3.\n\nStep 3: Calculate the volume of the cylindrical wire.\nVolume of cylinder = pi * r^2 * h\nGiven r = 0.2 cm, and let h be the length (height) of the wire:\nVolume = pi * (0.2)^2 * h = 0.04 * pi * h cm^3.\n\nStep 4: Equate the volumes and solve for h.\n288 * pi = 0.04 * pi * h\n288 = 0.04 * h\nh = 288 / 0.04 = 28800 / 4 = 7200 cm.\n\nStep 5: Convert the length from centimeters to meters.\nh = 7200 cm = 7200 / 100 meters = 72 meters.\n\nTherefore, the length of the wire is 72 meters.",
    "explanation_image_url": None,
    "topic": "Mensuration",
    "subtopic": "Melting and Recasting",
    "difficulty": "Medium",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 80,
    "common_mistakes": "Not converting the final height/length from cm to meters, or squaring the cylinder radius incorrectly.",
    "tags": ["geometry", "mensuration", "volume"],
    "source": "Inspired",
    "exam_year": 2024,
    "frequency": 3,
    "verified": True
})

# Q16
questions.append({
    "code": "NQT-0016",
    "question_text": "A mixture contains milk and water in the ratio of 4 : 3. If 5 liters of water is added to the mixture, the ratio becomes 4 : 5. Find the initial quantity of milk in the mixture (in liters).",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "10 liters"},
        {"id": "B", "text": "12 liters"},
        {"id": "C", "text": "15 liters"},
        {"id": "D", "text": "20 liters"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Set up equations based on ratios.\nLet the initial quantity of milk be 4x and water be 3x.\n\nStep 2: Adjust the mixture for the added water.\n5 liters of water is added. The new quantity of water is (3x + 5) liters. The quantity of milk remains 4x.\nThe new ratio of milk to water is 4 : 5.\n\nStep 3: Solve the equation.\n4x / (3x + 5) = 4 / 5\nCross-multiplying:\n5 * (4x) = 4 * (3x + 5)\n20x = 12x + 20\n20x - 12x = 20\n8x = 20\nx = 2.5.\n\nStep 4: Find the initial quantity of milk.\nMilk = 4x = 4 * 2.5 = 10 liters.\n\nTherefore, the initial quantity of milk was 10 liters.",
    "explanation_image_url": None,
    "topic": "Mixtures and Alligations",
    "subtopic": "Ratio Adjustments",
    "difficulty": "Easy",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 50,
    "common_mistakes": "Finding total volume (7x = 17.5L) or water quantity (3x = 7.5L) instead of milk.",
    "tags": ["mixtures", "ratios", "arithmetic"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 4,
    "verified": True
})

# Q17
questions.append({
    "code": "NQT-0017",
    "question_text": "If the sum of two numbers is 55 and their HCF and LCM are 5 and 120 respectively, then the sum of the reciprocals of the numbers is:",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "11/120"},
        {"id": "B", "text": "120/11"},
        {"id": "C", "text": "11/24"},
        {"id": "D", "text": "55/120"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Define variables for the two numbers.\nLet the two numbers be 'a' and 'b'. We are given:\na + b = 55.\n\nStep 2: Connect the product of the numbers to their HCF and LCM.\nA fundamental mathematical property states that:\nProduct of two numbers = HCF * LCM\na * b = 5 * 120 = 600.\n\nStep 3: Express the sum of the reciprocals algebraically.\nSum of reciprocals = 1/a + 1/b = (a + b) / (a * b)\n\nStep 4: Substitute the values from Step 1 and Step 2.\nSum of reciprocals = 55 / 600\nSimplifying by dividing numerator and denominator by 5:\nSum of reciprocals = 11 / 120.\n\nTherefore, the sum of their reciprocals is 11/120.",
    "explanation_image_url": None,
    "topic": "Number System",
    "subtopic": "Reciprocals and HCF/LCM",
    "difficulty": "Easy",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 45,
    "common_mistakes": "Trying to solve for the individual values of a and b first, which takes much longer, rather than using the reciprocal formula directly.",
    "tags": ["number-system", "lcm-hcf"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 4,
    "verified": True
})

# Q18
questions.append({
    "code": "NQT-0018",
    "question_text": "If the roots of the quadratic equation x^2 - px + q = 0 differ by 1, then which of the following is true?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "p^2 = 4q + 1"},
        {"id": "B", "text": "p^2 = 4q - 1"},
        {"id": "C", "text": "q^2 = 4p + 1"},
        {"id": "D", "text": "q^2 = 4p - 1"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Relate roots to coefficients using Vieta's formulas.\nLet the roots of the equation x^2 - px + q = 0 be a and b.\n- Sum of roots (a + b) = -(-p)/1 = p\n- Product of roots (a * b) = q/1 = q\n\nStep 2: Set up the given relation.\nWe are given that the roots differ by 1:\n|a - b| = 1 => (a - b)^2 = 1.\n\nStep 3: Connect (a - b)^2 with sum and product of roots.\nWe use the algebraic identity: (a - b)^2 = (a + b)^2 - 4ab.\n\nStep 4: Substitute the expressions from Step 1 into the identity.\n1 = p^2 - 4q\np^2 = 4q + 1.\n\nTherefore, the relation p^2 = 4q + 1 is true.",
    "explanation_image_url": None,
    "topic": "Equations",
    "subtopic": "Quadratic Equations",
    "difficulty": "Medium",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 60,
    "common_mistakes": "Mixing up the algebraic identity signs (e.g. thinking (a-b)^2 = (a+b)^2 + 4ab).",
    "tags": ["algebra", "quadratic-equations"],
    "source": "Inspired",
    "exam_year": 2024,
    "frequency": 3,
    "verified": True
})

# Q19
questions.append({
    "code": "NQT-0019",
    "question_text": "Find the sum of all natural numbers between 100 and 300 which are exactly divisible by 7.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "5586"},
        {"id": "B", "text": "5724"},
        {"id": "C", "text": "5530"},
        {"id": "D", "text": "5600"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Find the first and last terms divisible by 7 between 100 and 300.\n- Divide 100 by 7: 100 / 7 = 14.28. The first term is 7 * 15 = 105.\n- Divide 300 by 7: 300 / 7 = 42.85. The last term is 7 * 42 = 294.\n\nStep 2: Identify the Arithmetic Progression (AP).\nThe numbers form an AP: 105, 112, 119, ..., 294.\nHere:\n- First term (a) = 105\n- Common difference (d) = 7\n- Last term (l) = 294\n\nStep 3: Determine the number of terms (n).\nWe use the formula: l = a + (n - 1) * d\n294 = 105 + (n - 1) * 7\n294 - 105 = 7 * (n - 1)\n189 = 7 * (n - 1)\nn - 1 = 189 / 7 = 27\nn = 28.\n\nStep 4: Calculate the sum of the AP.\nWe use the formula: Sn = (n / 2) * (a + l)\nS = (28 / 2) * (105 + 294)\nS = 14 * 399 = 5,586.\n\nTherefore, the sum of these numbers is 5,586.",
    "explanation_image_url": None,
    "topic": "Progressions",
    "subtopic": "Arithmetic Progression",
    "difficulty": "Medium",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 75,
    "common_mistakes": "Misidentifying the first or last term, or miscalculating the number of terms n (e.g., off-by-one errors).",
    "tags": ["progressions", "ap", "arithmetic", "divisibility"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 4,
    "verified": True
})

# Q20
questions.append({
    "code": "NQT-0020",
    "question_text": "If a number 5432*7 is completely divisible by 9, then what digit should replace the asterisk (*)?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "0"},
        {"id": "B", "text": "6"},
        {"id": "C", "text": "9"},
        {"id": "D", "text": "8"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: State the divisibility rule for 9.\nA number is divisible by 9 if and only if the sum of its individual digits is a multiple of 9.\n\nStep 2: Calculate the sum of the known digits.\nSum = 5 + 4 + 3 + 2 + 7 = 21.\n\nStep 3: Formulate an expression with the missing digit (let it be x).\nSum of all digits = 21 + x.\n\nStep 4: Find the value of x (where x is a single digit: 0, 1, ..., 9) such that (21 + x) is divisible by 9.\nMultiples of 9 are 9, 18, 27, 36, ...\nThe next multiple of 9 immediately greater than or equal to 21 is 27.\n21 + x = 27\nx = 27 - 21 = 6.\n\nTherefore, the missing digit is 6.",
    "explanation_image_url": None,
    "topic": "Number System",
    "subtopic": "Divisibility Rules",
    "difficulty": "Easy",
    "section": "Numerical Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 30,
    "common_mistakes": "Adding digits incorrectly or using divisibility rule of 3 or 11 by mistake.",
    "tags": ["divisibility", "number-system"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})


# --- REASONING ABILITY (15 Questions) ---

# Q21
questions.append({
    "code": "NQT-0021",
    "question_text": "In a certain code language, 'ROBUST' is written as 'QNATRS'. How is 'BORDER' written in that language?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "ANQCQD"},
        {"id": "B", "text": "AOQDDQ"},
        {"id": "C", "text": "AQCQDD"},
        {"id": "D", "text": "AMQDDQ"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Analyze the pattern in the example word.\nCompare the letters of 'ROBUST' with 'QNATRS' side-by-side:\n- R -> Q (-1 shift: Q is the letter before R)\n- O -> N (-1 shift: N is the letter before O)\n- B -> A (-1 shift: A is the letter before B)\n- U -> T (-1 shift: T is the letter before U)\n- S -> R (-1 shift: R is the letter before S)\n- T -> S (-1 shift: S is the letter before T)\nThe pattern is that every letter in the word is shifted backward by 1 character (-1).\n\nStep 2: Apply the same pattern to the target word 'BORDER'.\n- B - 1 = A\n- O - 1 = N\n- R - 1 = Q\n- D - 1 = C\n- E - 1 = D\n- R - 1 = Q\nPutting it all together, BORDER is encoded as ANQCQD.\n\nStep 3: Match with options.\nANQCQD corresponds to Option A.",
    "explanation_image_url": None,
    "topic": "Coding Decoding",
    "subtopic": "Letter Shifts",
    "difficulty": "Easy",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 45,
    "common_mistakes": "Shifting forward instead of backward, which would yield 'CPSDFS'.",
    "tags": ["coding-decoding", "logic"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q22
questions.append({
    "code": "NQT-0022",
    "question_text": "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "Brother"},
        {"id": "B", "text": "Uncle"},
        {"id": "C", "text": "Father"},
        {"id": "D", "text": "Cousin"}
    ],
    "correct_answer": "C",
    "explanation": "Step-by-step Solution:\n\nStep 1: Break down the description from the speaker's perspective ('my mother').\nSuresh is speaking: 'my mother' refers to Suresh's mother.\n\nStep 2: Analyze 'only son of my mother'.\nThe only son of Suresh's mother must be Suresh himself (assuming Suresh is male, which is standard for Suresh, or Suresh is the speaker referring to their mother's only son).\n\nStep 3: Analyze 'He is the son of...'\nSubstituting 'Suresh' back into the phrase:\nHe is the son of [Suresh].\n\nStep 4: Relate Suresh back to the boy.\nSince the boy is the son of Suresh, Suresh is the Father of the boy.\n\nTherefore, Suresh is the father of the boy.",
    "explanation_image_url": None,
    "topic": "Blood Relations",
    "subtopic": "Pointing to Photograph",
    "difficulty": "Easy",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 40,
    "common_mistakes": "Misinterpreting 'only son of Suresh's mother' as Suresh's brother, leading to Uncle as the answer.",
    "tags": ["blood-relations", "logic"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q23
questions.append({
    "code": "NQT-0023",
    "question_text": "If 'A + B' means A is the brother of B; 'A - B' means A is the sister of B; and 'A * B' means A is the father of B. Which of the following means that C is the son of M?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "M * C - N"},
        {"id": "B", "text": "M * N - C"},
        {"id": "C", "text": "M * C + N"},
        {"id": "D", "text": "M * N + C"}
    ],
    "correct_answer": "C",
    "explanation": "Step-by-step Solution:\n\nStep 1: Determine the requirements for 'C is the son of M'.\n- M must be the parent (specifically father here, given the '*' operator) of C.\n- C must be male (brother relation '+').\n\nStep 2: Evaluate the option candidates.\n- Let's check Option A: M * C - N\n  * M * C means M is the father of C.\n  * C - N means C is the sister of N (establishing C as female).\n  Therefore, C is the daughter of M. Incorrect.\n\n- Let's check Option B: M * N - C\n  * M * N means M is the father of N.\n  * N - C means N is the sister of C.\n  This does not define C's gender or direct relation as M's son. Incorrect.\n\n- Let's check Option C: M * C + N\n  * M * C means M is the father of C.\n  * C + N means C is the brother of N (establishing C as male).\n  Since M is the father of C and C is male, C is indeed the son of M. Correct.\n\nTherefore, option C represents 'C is the son of M'.",
    "explanation_image_url": None,
    "topic": "Blood Relations",
    "subtopic": "Coded Blood Relations",
    "difficulty": "Medium",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 75,
    "common_mistakes": "Forgetting to verify the gender of C, leading to choosing Option A (where C is a female/daughter).",
    "tags": ["blood-relations", "logic", "coded-relations"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 4,
    "verified": True
})

# Q24
questions.append({
    "code": "NQT-0024",
    "question_text": "A man walks 5 km toward South and then turns to the right. After walking 3 km he turns to the left and walks 5 km. Now in which direction is he from the starting place?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "West"},
        {"id": "B", "text": "South"},
        {"id": "C", "text": "South-West"},
        {"id": "D", "text": "North-East"}
    ],
    "correct_answer": "C",
    "explanation": "Step-by-step Solution:\n\nStep 1: Map the starting position.\nLet the starting point be origin (0, 0) with North as +y, South as -y, East as +x, and West as -x.\n\nStep 2: Trace the first leg of the journey.\n- Walks 5 km South.\n- New coordinates = (0, -5).\n\nStep 3: Trace the second leg.\n- Facing South, the man turns to his right (which is West).\n- Walks 3 km West.\n- New coordinates = (-3, -5).\n\nStep 4: Trace the third leg.\n- Facing West, the man turns left (which is South).\n- Walks 5 km South.\n- Final coordinates = (-3, -10).\n\nStep 5: Determine the final direction from the starting point.\nThe starting point is (0, 0) and the final point is (-3, -10).\n- -3 on the x-axis indicates West.\n- -10 on the y-axis indicates South.\nThus, the final position (-3, -10) is in the South-West quadrant relative to (0, 0).\n\nTherefore, he is in the South-West direction from the starting point.",
    "explanation_image_url": None,
    "topic": "Direction Sense",
    "subtopic": "Relative Direction",
    "difficulty": "Easy",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 50,
    "common_mistakes": "Mixing up left/right turns when facing South. (A right turn when facing South points West; a left turn when facing West points South).",
    "tags": ["directions", "spatial-reasoning"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 4,
    "verified": True
})

# Q25
questions.append({
    "code": "NQT-0025",
    "question_text": "Statements:\nI. All pencils are pens.\nII. Some pens are erasers.\nConclusions:\n1. Some pencils are erasers.\n2. Some pens are pencils.\nChoose the correct option:",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "Only conclusion 1 follows"},
        {"id": "B", "text": "Only conclusion 2 follows"},
        {"id": "C", "text": "Either 1 or 2 follows"},
        {"id": "D", "text": "Neither 1 nor 2 follows"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution using Venn Diagrams:\n\nStep 1: Represent Statement I ('All pencils are pens') using circles.\nDraw a circle for 'Pencils' entirely inside a larger circle for 'Pens'.\n\nStep 2: Represent Statement II ('Some pens are erasers') on the same diagram.\nDraw a circle for 'Erasers' that overlaps with the 'Pens' circle.\nNote: There are two possible scenarios here:\n- Case A: The 'Erasers' circle overlaps 'Pens' but does NOT touch the 'Pencils' circle.\n- Case B: The 'Erasers' circle overlaps 'Pens' and ALSO overlaps the 'Pencils' circle.\n\nStep 3: Evaluate Conclusion 1 ('Some pencils are erasers').\nFor a conclusion to follow, it must be true in ALL possible scenarios.\nIn Case A, no pencil is an eraser. Since it is not true in all scenarios, Conclusion 1 does not follow.\n\nStep 4: Evaluate Conclusion 2 ('Some pens are pencils').\nSince the 'Pencils' circle is entirely inside the 'Pens' circle, any region occupied by pencils is also occupied by pens. Therefore, some portion of pens is always pencils.\nThus, Conclusion 2 is always true and follows.\n\nTherefore, only conclusion 2 follows.",
    "explanation_image_url": None,
    "topic": "Syllogism",
    "subtopic": "Two Statements",
    "difficulty": "Easy",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 50,
    "common_mistakes": "Assuming a connection between pencils and erasers simply because they both intersect with pens.",
    "tags": ["syllogism", "logic", "deductive-reasoning"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q26
questions.append({
    "code": "NQT-0026",
    "question_text": "Six friends A, B, C, D, E, and F are sitting around a circular table facing the center. B is between F and D; A is two places left of E, and E is adjacent to F. Who is sitting opposite to A?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "B"},
        {"id": "B", "text": "D"},
        {"id": "C", "text": "E"},
        {"id": "D", "text": "F"}
    ],
    "correct_answer": "D",
    "explanation": "Step-by-step Solution:\n\nStep 1: Set up the circular positions.\nLet 6 seats around the circular table be numbered 1 to 6 in clockwise order. Since they face the center, 'left' refers to clockwise movement, and 'right' refers to counter-clockwise.\n\nStep 2: Place E and A based on the rules.\n- Place E at Position 1.\n- Rule: 'A is two places left of E'. Going clockwise from E: Position 2 is 1st left, Position 3 is 2nd left. Place A at Position 3.\n\nStep 3: Place F based on E's adjacency.\n- Rule: 'E is adjacent to F'. E is at 1, so F must be at either Position 2 or Position 6.\n- Scenario A: If F is at Position 2. Then B (who is between F and D) would need to be at Position 3 (which is already occupied by A). This is a conflict.\n- Scenario B: Thus, F must be at Position 6.\n\nStep 4: Place B and D.\n- Rule: 'B is between F and D'. With F at 6, B must be at Position 5, and D must be at Position 4 (leaving B between F at 6 and D at 4).\n\nStep 5: Place the remaining person.\n- This leaves C to occupy Position 2.\n\nFinal arrangement (Positions 1 to 6): E(1), C(2), A(3), D(4), B(5), F(6).\n\nStep 6: Determine who sits opposite to A.\nIn a 6-person circular table, the person opposite position x is position x + 3.\nOpposite A (Position 3) is Position 6 (3 + 3), which is occupied by F.\n\nTherefore, F is sitting opposite to A.",
    "explanation_image_url": None,
    "topic": "Seating Arrangements",
    "subtopic": "Circular Arrangement",
    "difficulty": "Medium",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 85,
    "common_mistakes": "Mixing up clockwise/counter-clockwise directions for left/right turns when facing the center of a circle.",
    "tags": ["circular-seating", "logical-deduction"],
    "source": "Inspired",
    "exam_year": 2024,
    "frequency": 4,
    "verified": True
})

# Q27
questions.append({
    "code": "NQT-0027",
    "question_text": "Five people P, Q, R, S, and T are standing in a queue facing North. R is standing between P and T. Q is standing immediately to the left of T. S is standing at the extreme right end. Who is standing in the middle of the queue?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "P"},
        {"id": "B", "text": "Q"},
        {"id": "C", "text": "R"},
        {"id": "D", "text": "T"}
    ],
    "correct_answer": "C",
    "explanation": "Step-by-step Solution:\n\nStep 1: Set up the queue slots.\nLet the 5 queue slots from left to right be 1, 2, 3, 4, 5 (facing North means left is left, right is right).\n\nStep 2: Place S based on the rules.\n- Rule: 'S is standing at the extreme right end'. Place S at slot 5.\nQueue: [_, _, _, _, S]\n\nStep 3: Analyze the group Q, T, R, P.\n- Rule: 'Q is standing immediately to the left of T' -> We have a block: [Q, T].\n- Rule: 'R is standing between P and T'. This means the order must be either P-R-T or T-R-P.\n\nStep 4: Check combinations.\n- If order is P-R-T:\n  Since Q is immediately left of T, we would have: P - R - [Q - T]. But R must be adjacent to both P and T, which is violated if Q is inserted. So this does not work.\n- If order is T-R-P:\n  Since Q is immediately left of T, we get the combined sequence: Q - T - R - P.\n\nStep 5: Fit the sequence into the queue.\nSince slot 5 is occupied by S, the 4-person sequence [Q, T, R, P] must occupy slots 1 to 4.\nQueue: [Q(1), T(2), R(3), P(4), S(5)]\n\nStep 6: Identify the middle slot.\nThe middle slot in a 5-person queue is slot 3, which is occupied by R.\n\nTherefore, R is standing in the middle of the queue.",
    "explanation_image_url": None,
    "topic": "Seating Arrangements",
    "subtopic": "Linear Arrangement",
    "difficulty": "Medium",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 75,
    "common_mistakes": "Placing Q and T incorrectly, or misidentifying who is in the middle.",
    "tags": ["linear-seating", "queues"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 4,
    "verified": True
})

# Q28
questions.append({
    "code": "NQT-0028",
    "question_text": "Each of the questions below consists of a question and two statements numbered I and II. Decide whether the data provided in the statements are sufficient to answer the question.\nQuestion: What is the age of Rohan?\nStatements:\nI. Rohan is twice as old as his sister Sophia, who was born in 2012.\nII. Rohan's age is 5 years less than his brother Sahil's age, and Sahil is 19 years old.\nChoose the correct option:",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "Statement I alone is sufficient, but Statement II alone is not sufficient"},
        {"id": "B", "text": "Statement II alone is sufficient, but Statement I alone is not sufficient"},
        {"id": "C", "text": "Either Statement I alone or Statement II alone is sufficient"},
        {"id": "D", "text": "Both Statements I and II together are not sufficient"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Define what is required to answer the question.\nTo determine the age of Rohan, we need information that results in a single, concrete numerical value for his age.\n\nStep 2: Analyze Statement I alone.\nStatement I: 'Rohan is twice as old as his sister Sophia, who was born in 2012.'\n- Sophia was born in 2012.\n- Sophia's age depends entirely on the current year. Since the current year is not specified in the question, Sophia's age is unknown.\n- Consequently, Rohan's age cannot be calculated as a fixed number.\n- Statement I alone is NOT sufficient.\n\nStep 3: Analyze Statement II alone.\nStatement II: 'Rohan's age is 5 years less than his brother Sahil's age, and Sahil is 19 years old.'\n- Sahil's age = 19 years.\n- Rohan's age = Sahil's age - 5 = 19 - 5 = 14 years.\n- This gives a unique, definitive numerical answer.\n- Statement II alone is SUFFICIENT.\n\nTherefore, Statement II alone is sufficient, but Statement I alone is not sufficient.",
    "explanation_image_url": None,
    "topic": "Data Sufficiency",
    "subtopic": "Age Calculations",
    "difficulty": "Medium",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 80,
    "common_mistakes": "Assuming the current year is known and concluding that Statement I is also sufficient.",
    "tags": ["data-sufficiency", "ages"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 3,
    "verified": True
})

# Q29
questions.append({
    "code": "NQT-0029",
    "question_text": "What is the angle (in degrees) between the hour hand and the minute hand of a clock at 8:30?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "60°"},
        {"id": "B", "text": "75°"},
        {"id": "C", "text": "85°"},
        {"id": "D", "text": "90°"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nMethod 1: Formula\nStep 1: State the clock angle formula.\nAngle = |30H - 5.5M|\nwhere H is hours and M is minutes.\n\nStep 2: Substitute the values for 8:30 (H = 8, M = 30).\nAngle = |30 * 8 - 5.5 * 30|\nAngle = |240 - 165|\nAngle = 75°.\n\nMethod 2: Logical Calculation\nStep 1: Calculate the position of the minute hand.\nAt 30 minutes, the minute hand points exactly at the 6 mark (180° from 12).\n\nStep 2: Calculate the position of the hour hand.\nAt 8:30, the hour hand has moved halfway between 8 and 9.\n- Each hour mark represents 30° (360° / 12).\n- Position of hour hand at 8 o'clock = 8 * 30° = 240°.\n- In 30 minutes, the hour hand moves = 30 minutes * 0.5°/minute = 15°.\n- Total position of hour hand = 240° + 15° = 255°.\n\nStep 3: Calculate the difference between the positions.\nAngle = 255° - 180° = 75°.\n\nTherefore, the angle is 75°.",
    "explanation_image_url": None,
    "topic": "Clocks and Calendars",
    "subtopic": "Angle Between Hands",
    "difficulty": "Easy",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 45,
    "common_mistakes": "Assuming the hour hand is exactly at 8 (which would make the angle 60°), forgetting that the hour hand moves as the minutes pass.",
    "tags": ["clocks", "angles", "logic"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q30
questions.append({
    "code": "NQT-0030",
    "question_text": "If January 1, 2016, was a Friday, what day of the week was January 1, 2017?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "Saturday"},
        {"id": "B", "text": "Sunday"},
        {"id": "C", "text": "Monday"},
        {"id": "D", "text": "Tuesday"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Check if the year 2016 is a leap year.\nA year is a leap year if it is divisible by 4.\n2016 / 4 = 504 (perfectly divisible). Thus, 2016 is a leap year.\n\nStep 2: Determine the number of days in 2016.\nSince 2016 is a leap year, it has 366 days (including February 29).\n\nStep 3: Calculate the number of odd days in the year.\nNumber of weeks = 366 / 7 = 52 weeks and 2 remaining days.\nThese 2 remaining days are the 'odd days'.\n\nStep 4: Shift the day of the week by the number of odd days.\nWhen we move from January 1 of one year to January 1 of the next year, the day of the week shifts by the number of odd days in the intervening year.\nSince 2016 has 2 odd days:\nJanuary 1, 2017 = Friday + 2 days = Sunday.\n\nTherefore, January 1, 2017 was a Sunday.",
    "explanation_image_url": None,
    "topic": "Clocks and Calendars",
    "subtopic": "Calendar Odd Days",
    "difficulty": "Medium",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 50,
    "common_mistakes": "Forgetting that 2016 is a leap year and only adding 1 odd day, resulting in Saturday.",
    "tags": ["calendars", "leap-year", "logic"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 4,
    "verified": True
})

# Q31
questions.append({
    "code": "NQT-0031",
    "question_text": "Identify the missing number in the following series: 4, 9, 20, 43, 90, ?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "180"},
        {"id": "B", "text": "185"},
        {"id": "C", "text": "183"},
        {"id": "D", "text": "187"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Check the differences between consecutive terms to see if there is a pattern.\n- 9 - 4 = 5\n- 20 - 9 = 11\n- 43 - 20 = 23\n- 90 - 43 = 47\nThe differences are 5, 11, 23, 47. Notice that: \n  * 5 * 2 + 1 = 11\n  * 11 * 2 + 1 = 23\n  * 23 * 2 + 1 = 47\nThis is one way to solve it, but let's check a more direct multiplication relationship.\n\nStep 2: Analyze the relationship between a term (n) and the next term (n+1).\n- 4 -> 9: 4 * 2 + 1 = 9\n- 9 -> 20: 9 * 2 + 2 = 20\n- 20 -> 43: 20 * 2 + 3 = 43\n- 43 -> 90: 43 * 2 + 4 = 90\nThe pattern is: Next Term = (Current Term * 2) + k (where k increases by 1 each step: 1, 2, 3, 4...).\n\nStep 3: Apply the pattern to find the missing term.\nThe multiplier is 2, and the next value of k is 5:\nMissing Term = (90 * 2) + 5\nMissing Term = 180 + 5 = 185.\n\nTherefore, the missing number is 185.",
    "explanation_image_url": None,
    "topic": "Series Completion",
    "subtopic": "Number Series",
    "difficulty": "Easy",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 45,
    "common_mistakes": "Assuming a simple difference pattern or multiplying by 2 and adding 1 consistently without incrementing.",
    "tags": ["number-series", "pattern-recognition"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q32
questions.append({
    "code": "NQT-0032",
    "question_text": "Which of the following Venn diagrams correctly represents the relationship between 'Doctors', 'Engineers', and 'Professionals'?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "Two disjoint circles inside a larger circle"},
        {"id": "B", "text": "Three intersecting circles"},
        {"id": "C", "text": "Three disjoint circles"},
        {"id": "D", "text": "One circle inside another circle, which is inside a third circle"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Analyze the categories independently.\n- 'Doctors' are individuals who practice medicine.\n- 'Engineers' are individuals who design/build machines or structures.\nThere is no overlap between the actual professions; a person cannot concurrently hold a job that is both a practicing doctor and practicing engineer. Thus, the circles for 'Doctors' and 'Engineers' must be disjoint (separate).\n\nStep 2: Relate these categories to 'Professionals'.\nBoth doctors and engineers are classified as 'Professionals'. Therefore, both separate circles must lie entirely inside the larger circle representing 'Professionals'.\n\nStep 3: Match with the choices.\nThis structure corresponds to: Two disjoint circles inside a larger circle (Option A).",
    "explanation_image_url": None,
    "topic": "Venn Diagrams",
    "subtopic": "Logical Relations",
    "difficulty": "Easy",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 30,
    "common_mistakes": "Thinking that a person cannot be both a doctor and a professional, or overlapping doctor and engineer circles.",
    "tags": ["venn-diagrams", "logic"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 4,
    "verified": True
})

# Q33
questions.append({
    "code": "NQT-0033",
    "question_text": "Statement: 'Buy our product to get a 50% discount and a chance to win a holiday package,' advertised Company X.\nAssumptions:\nI. People are attracted to discounts and free holiday packages.\nII. The product sold by Company X is of very high quality.\nChoose the correct option:",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "Only assumption I is implicit"},
        {"id": "B", "text": "Only assumption II is implicit"},
        {"id": "C", "text": "Both assumptions I and II are implicit"},
        {"id": "D", "text": "Neither assumption I nor II is implicit"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Define what an 'implicit assumption' is.\nAn assumption is something taken for granted or assumed to be true when making a statement.\n\nStep 2: Evaluate Assumption I ('People are attracted to discounts and free holiday packages').\n- Company X is using these offers in their advertisement to encourage sales.\n- Why would they do this? They must assume that people find discounts and holiday packages appealing enough to buy the product.\n- Therefore, Assumption I is implicit in the company's decision to advertise this way.\n\nStep 3: Evaluate Assumption II ('The product sold by Company X is of very high quality').\n- The advertisement focuses entirely on financial discounts and rewards.\n- There is no mention of product features, reliability, or quality in the statement.\n- One does not need to assume the product is of high quality to offer a discount on it.\n- Therefore, Assumption II is not implicit.\n\nHence, only assumption I is implicit.",
    "explanation_image_url": None,
    "topic": "Critical Reasoning",
    "subtopic": "Statement and Assumptions",
    "difficulty": "Medium",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 60,
    "common_mistakes": "Conflating business marketing intentions (attracting customers via offers) with the quality of the actual product.",
    "tags": ["critical-reasoning", "assumptions"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 3,
    "verified": True
})

# Q34
questions.append({
    "code": "NQT-0034",
    "question_text": "Statement: Regular exercise significantly reduces the risk of heart disease.\nConclusions:\nI. People who do not exercise will definitely suffer from heart disease.\nII. Active lifestyle is beneficial for cardiac health.\nChoose the correct option:",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "Only conclusion I follows"},
        {"id": "B", "text": "Only conclusion II follows"},
        {"id": "C", "text": "Both conclusions I and II follow"},
        {"id": "D", "text": "Neither conclusion I nor II follows"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Analyze the scope of the premise statement.\nThe premise states: Regular exercise (cause) -> significantly reduces the risk of heart disease (effect).\nNote: It reduces the 'risk'; it does not eliminate it entirely, nor is it the only risk factor.\n\nStep 2: Evaluate Conclusion I ('People who do not exercise will definitely suffer from heart disease').\n- The statement does not establish that lack of exercise is a direct, absolute guarantee of heart disease.\n- The word 'definitely' is too extreme and makes the conclusion logically invalid based on a probabilistic premise (reducing risk).\n- Therefore, Conclusion I does not follow.\n\nStep 3: Evaluate Conclusion II ('Active lifestyle is beneficial for cardiac health').\n- Regular exercise corresponds to an active lifestyle.\n- Reducing the risk of heart disease directly implies a benefit to cardiac health.\n- Therefore, Conclusion II follows logically and directly from the statement.\n\nHence, only conclusion II follows.",
    "explanation_image_url": None,
    "topic": "Critical Reasoning",
    "subtopic": "Statement and Conclusions",
    "difficulty": "Medium",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 50,
    "common_mistakes": "Selecting Conclusion I because of logical inversion (assuming that if exercise helps, no exercise must mean disease).",
    "tags": ["critical-reasoning", "conclusions"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 4,
    "verified": True
})

# Q35
questions.append({
    "code": "NQT-0035",
    "question_text": "Which number replaces the question mark in the following grid?\n[ 5 ] [ 7 ] [ 74 ]\n[ 3 ] [ 8 ] [ 73 ]\n[ 6 ] [ 4 ] [ ? ]",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "50"},
        {"id": "B", "text": "52"},
        {"id": "C", "text": "48"},
        {"id": "D", "text": "45"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Check mathematical relations in Row 1.\n- Inputs: 5 and 7. Target output: 74.\n- Let's check addition: 5 + 7 = 12 (No)\n- Let's check multiplication: 5 * 7 = 35 (No, but 35 * 2 = 70, which is close)\n- Let's check sum of squares:\n  5^2 + 7^2 = 25 + 49 = 74. (This matches exactly!)\n\nStep 2: Test the same pattern on Row 2.\n- Inputs: 3 and 8. Target output: 73.\n- Sum of squares:\n  3^2 + 8^2 = 9 + 64 = 73. (The pattern is confirmed!)\n\nStep 3: Apply the pattern to Row 3 to find the missing value.\n- Inputs: 6 and 4.\n- Sum of squares:\n  6^2 + 4^2 = 36 + 16 = 52.\n\nTherefore, the missing number is 52.",
    "explanation_image_url": None,
    "topic": "Visual and Spatial Reasoning",
    "subtopic": "Grid Patterns",
    "difficulty": "Medium",
    "section": "Reasoning Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 60,
    "common_mistakes": "Trying to find vertical relationships or arithmetic progressions instead of checking squares of row values.",
    "tags": ["puzzles", "number-grid", "logic"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 3,
    "verified": True
})


# --- VERBAL ABILITY (15 Questions) ---

# Q36
questions.append({
    "code": "NQT-0036",
    "question_text": "Select the word that best fits the meaning of the sentence:\nThe manager decided to ______ the meeting until next Tuesday because of the heavy rain forecast.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "call off"},
        {"id": "B", "text": "put off"},
        {"id": "C", "text": "hold up"},
        {"id": "D", "text": "bring about"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Understand the context of the sentence.\nThe manager is changing the date of the meeting ('until next Tuesday') due to a weather forecast. This means the meeting is being rescheduled or postponed.\n\nStep 2: Analyze the phrasal verb choices.\n- 'Put off' means to postpone or delay to a later time. This fits perfectly.\n- 'Call off' means to cancel entirely. Since a new date (next Tuesday) is specified, the meeting is not canceled. Incorrect.\n- 'Hold up' means to delay or block progress. Incorrect.\n- 'Bring about' means to cause to happen. Incorrect.\n\nTherefore, 'put off' is the correct choice.",
    "explanation_image_url": None,
    "topic": "Sentence Completion",
    "subtopic": "Phrasal Verbs",
    "difficulty": "Easy",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 25,
    "common_mistakes": "Confusing 'put off' (postpone) with 'call off' (cancel).",
    "tags": ["phrasal-verbs", "grammar", "vocabulary"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q37
questions.append({
    "code": "NQT-0037",
    "question_text": "Select the word that best fits the meaning of the sentence:\nDespite the team's best efforts, the project was deemed a failure due to the ______ resources allocated to it.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "abundant"},
        {"id": "B", "text": "superfluous"},
        {"id": "C", "text": "meager"},
        {"id": "D", "text": "redundant"}
    ],
    "correct_answer": "C",
    "explanation": "Step-by-step Solution:\n\nStep 1: Understand the sentence logic.\n- The word 'Despite' indicates a contrast. Even though the team made their best efforts, the project failed.\n- The cause of failure was the nature of the resources allocated to it. Therefore, the blank must be filled with a word that implies insufficient or inadequate resources.\n\nStep 2: Evaluate the vocabulary choices.\n- 'Abundant' means plentiful or in large quantities. Incorrect (would not cause failure).\n- 'Superfluous' means excessive or unnecessary. Incorrect.\n- 'Meager' means lacking in quantity or quality (inadequate). This logically explains the failure. Correct.\n- 'Redundant' means no longer needed or duplicate. Incorrect.\n\nTherefore, 'meager' is the correct choice.",
    "explanation_image_url": None,
    "topic": "Sentence Completion",
    "subtopic": "Vocabulary Context",
    "difficulty": "Easy",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 25,
    "common_mistakes": "Misunderstanding the word 'meager' or selecting 'superfluous' (which means excess).",
    "tags": ["vocabulary", "contextual-vocab"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q38
questions.append({
    "code": "NQT-0038",
    "question_text": "Identify the part of the sentence that contains an error:\nNeither the teacher (A) / nor the students (B) / was present in (C) / the classroom yesterday (D).",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "Neither the teacher"},
        {"id": "B", "text": "nor the students"},
        {"id": "C", "text": "was present in"},
        {"id": "D", "text": "the classroom yesterday"}
    ],
    "correct_answer": "C",
    "explanation": "Step-by-step Solution:\n\nStep 1: Identify the grammatical structure.\nThe sentence uses the correlative conjunction pair 'Neither... nor'.\n\nStep 2: Recall the subject-verb agreement rule for 'Neither... nor'.\nWhen two subjects are joined by 'neither... nor', the verb agrees in number with the subject that is closer to it (proximity rule).\n- Subject 1: 'the teacher' (singular)\n- Subject 2: 'the students' (plural)\n\nStep 3: Check the verb proximity.\nThe verb is 'was'. The subject closer to the verb is 'the students' (plural).\n\nStep 4: Identify the error.\nA plural subject ('students') requires a plural verb ('were'). Thus, 'was' should be replaced with 'were'.\nThis error is in part C.\n\nTherefore, part C is the correct option.",
    "explanation_image_url": None,
    "topic": "Spotting Errors",
    "subtopic": "Subject Verb Agreement",
    "difficulty": "Medium",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 35,
    "common_mistakes": "Matching the verb with the first subject ('the teacher') instead of the closer one ('the students').",
    "tags": ["subject-verb-agreement", "grammar", "spotting-errors"],
    "source": "Inspired",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q39
questions.append({
    "code": "NQT-0039",
    "question_text": "Identify the part of the sentence that contains an error:\nThe flock of sheep (A) / were grazing in the valley (B) / when the wolf attacked (C) / without warning (D).",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "The flock of sheep"},
        {"id": "B", "text": "were grazing in the valley"},
        {"id": "C", "text": "when the wolf attacked"},
        {"id": "D", "text": "without warning"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Identify the subject of the sentence.\nThe subject is 'The flock of sheep'.\n\nStep 2: Analyze the collective noun 'flock'.\n'Flock' is a collective noun. When a collective noun acts as a single cohesive unit, it takes a singular verb.\nHere, the flock is behaving as a single unit grazing together.\n\nStep 3: Analyze the verb.\nThe verb is 'were' (plural).\n\nStep 4: Identify the correction.\nSince 'flock' is singular, it requires the singular verb 'was'. The plural 'were' is incorrect.\nThis error is in part B.\n\nTherefore, part B is the correct option.",
    "explanation_image_url": None,
    "topic": "Spotting Errors",
    "subtopic": "Collective Nouns",
    "difficulty": "Medium",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 35,
    "common_mistakes": "Looking at 'sheep' and thinking the plural verb 'were' is correct, ignoring the collective noun head 'flock'.",
    "tags": ["nouns", "grammar", "spotting-errors"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 4,
    "verified": True
})

# Q40
questions.append({
    "code": "NQT-0040",
    "question_text": "Rearrange the following sentences to form a coherent paragraph:\nP. This research is crucial because global warming is accelerating rapidly.\nQ. Scientists have been studying the melting of glaciers in the Antarctic.\nR. The results indicate that sea levels could rise by several feet by the end of the century.\nS. They have collected ice core samples to analyze past climate shifts.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "QSPR"},
        {"id": "B", "text": "QSRP"},
        {"id": "C", "text": "PQSR"},
        {"id": "D", "text": "SPQR"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Find the introductory sentence.\n- Sentence Q introduces the main subject: Scientists studying the melting of glaciers in the Antarctic. This is a standalone introduction. Thus, Q comes first.\n\nStep 2: Look for pronoun linkages.\n- Sentence S starts with 'They'. 'They' is a pronoun referencing 'Scientists' in sentence Q. S describes the immediate action taken by the scientists (collecting samples). Therefore, S must follow Q (Q -> S).\n\nStep 3: Find the reference connection.\n- Sentence P starts with 'This research'. This refers to the scientific work described in Q and S. P explains the significance of their research. This forms the chain (Q -> S -> P).\n\nStep 4: Complete the logical transition.\n- Sentence R concludes with the outcome of the research ('The results indicate...').\n\nFinal order: Q-S-P-R.\nThis matches Option A.",
    "explanation_image_url": None,
    "topic": "Passage Recall",
    "subtopic": "Sentence Rearrangement",
    "difficulty": "Medium",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 75,
    "common_mistakes": "Placing P at the beginning or misconnecting the pronoun 'They' to something other than 'Scientists'.",
    "tags": ["para-jumbles", "reading-comprehension"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 4,
    "verified": True
})

# Q41
questions.append({
    "code": "NQT-0041",
    "question_text": "Passage Recall - Read and Reconstruct:\n\"The Industrial Revolution, which began in Britain in the late 18th century, transformed rural societies into urban, industrial ones. The introduction of steam power and mechanized machinery led to unprecedented increases in production capacity, laying the groundwork for modern capitalism.\"\nReconstruct this passage in your own words, maintaining the core meaning and key facts.",
    "question_image_url": None,
    "options": None,
    "correct_answer": "The Industrial Revolution started in Britain during the late 1700s, shifting societies from rural farming to urban industrial centers. Inventions like steam engines and mechanized tools dramatically boosted manufacturing and production, setting the foundation for contemporary capitalism.",
    "explanation": "Step-by-step Solution Breakdown:\n\nStep 1: Identify key historical facts that must be present in the reconstruction:\n1. Origin/Location: Britain.\n2. Timeline: Late 18th century (or late 1700s).\n3. Social change: Rural to urban/industrial society.\n4. Catalysts: Steam power and mechanized machinery.\n5. Outcome: Increased production capacity and rise of modern capitalism.\n\nStep 2: Paraphrase each fact without losing meaning:\n- 'began in Britain in the late 18th century' -> 'started in Britain during the late 1700s'\n- 'transformed rural societies into urban, industrial ones' -> 'shifting societies from rural farming to urban industrial centers'\n- 'introduction of steam power and mechanized machinery' -> 'inventions like steam engines and mechanized tools'\n- 'led to unprecedented increases in production capacity, laying the groundwork for modern capitalism' -> 'dramatically boosted manufacturing and production, setting the foundation for contemporary capitalism.'\n\nStep 3: Combine these into coherent, original sentences as shown in the correct answer.",
    "explanation_image_url": None,
    "topic": "Passage Recall",
    "subtopic": "Written Reconstruction",
    "difficulty": "Hard",
    "section": "Verbal Ability",
    "question_type": "Text",
    "estimated_solve_time": 120,
    "common_mistakes": "Leaving out the origin (Britain, late 18th century) or failing to mention steam power and mechanization.",
    "tags": ["passage-recall", "writing-skills", "reconstruction"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q42
questions.append({
    "code": "NQT-0042",
    "question_text": "Email Writing - Situation Prompt:\nWrite an email to your project manager requesting a 3-day extension on your current software development project. Mention the reasons for the delay (e.g., api integration delays, server downtime) and provide a revised timeline. Write in complete sentences and maintain a professional tone. Length: 100-150 words.",
    "question_image_url": None,
    "options": None,
    "correct_answer": "Subject: Request for Project Deadline Extension\n\nDear [Manager's Name],\n\nI am writing to formally request a three-day extension on the deadline for our current software development project, originally scheduled for completion this Friday.\n\nWe encountered unexpected technical difficulties during the API integration phase, compounded by server downtime that halted development for a full day. Although these issues have now been resolved, they have set our timeline back.\n\nWith this extension, we will be able to perform thorough quality assurance testing to ensure a stable release. Our revised delivery date would be next Wednesday. I appreciate your understanding and support.\n\nBest regards,\n[Your Name]",
    "explanation": "Step-by-step Solution Breakdown:\n\nStep 1: Subject Line\n- Must be clear, professional, and state the exact purpose (e.g. 'Request for Project Deadline Extension').\n\nStep 2: Salutation\n- Use a formal salutation (e.g. 'Dear [Manager's Name],').\n\nStep 3: Opening Statement\n- State the request clearly in the first sentence (requesting a 3-day extension from Friday).\n\nStep 4: Body Paragraph (The Delay Reasons)\n- List the technical challenges professionally (API integration difficulties, server downtime).\n\nStep 5: Proposed Timeline & Value Addition\n- Propose the new timeline (next Wednesday) and explain why the extension is beneficial (allows for thorough QA testing for a stable release).\n\nStep 6: Closing & Sign-off\n- Professional closing expression ('I appreciate your understanding') followed by sign-off ('Best regards, [Your Name]').",
    "explanation_image_url": None,
    "topic": "Email Writing",
    "subtopic": "Professional Communication",
    "difficulty": "Medium",
    "section": "Verbal Ability",
    "question_type": "Text",
    "estimated_solve_time": 540,
    "common_mistakes": "Writing less than 100 words, using informal slang, or failing to state the exact reasons and new date.",
    "tags": ["email-writing", "writing-skills", "business-english"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q43
questions.append({
    "code": "NQT-0043",
    "question_text": "Choose the word which is closest in meaning to the bold word in the sentence:\nThe speaker's **eloquent** presentation captivated the entire audience.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "boring"},
        {"id": "B", "text": "persuasive and expressive"},
        {"id": "C", "text": "loud"},
        {"id": "D", "text": "confusing"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Understand the sentence context.\nThe speaker's presentation 'captivated the entire audience'. This indicates that the presentation was highly effective, fluent, and pleasing to listen to.\n\nStep 2: Define the word 'eloquent'.\n'Eloquent' means fluent, persuasive, and powerful in speaking or writing.\n\nStep 3: Evaluate the options.\n- 'boring': Antonym of what would captivate an audience. Incorrect.\n- 'persuasive and expressive': Directly aligns with the definition of eloquent. Correct.\n- 'loud': While a speaker might be loud, loudness alone is not equivalent to eloquence. Incorrect.\n- 'confusing': Would not captivate an audience positively. Incorrect.\n\nTherefore, 'persuasive and expressive' is the correct choice.",
    "explanation_image_url": None,
    "topic": "Synonyms and Antonyms",
    "subtopic": "Synonyms",
    "difficulty": "Easy",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 20,
    "common_mistakes": "Choosing 'loud' because of the association with public speaking, or selecting antonyms like 'boring'.",
    "tags": ["vocabulary", "synonyms"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q44
questions.append({
    "code": "NQT-0044",
    "question_text": "Choose the word which is opposite in meaning to the bold word in the sentence:\nHer decision to resign was **evanescent**, as she changed her mind the very next day.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "permanent"},
        {"id": "B", "text": "temporary"},
        {"id": "C", "text": "foolish"},
        {"id": "D", "text": "spontaneous"}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Analyze the sentence context.\n'She changed her mind the very next day' indicates that her decision lasted only a very short time.\n\nStep 2: Define 'evanescent'.\n'Evanescent' means quickly fading, vanishing, or lasting for a very short time (temporary).\n\nStep 3: Identify the goal.\nWe need to find the word *opposite* in meaning (antonym).\n\nStep 4: Evaluate the options.\n- 'permanent': Lasting or intended to last indefinitely. This is the direct opposite of temporary/evanescent. Correct.\n- 'temporary': Synonym of evanescent. Incorrect.\n- 'foolish': Unrelated. Incorrect.\n- 'spontaneous': Performed or occurring as a result of a sudden impulse. Unrelated. Incorrect.\n\nTherefore, the opposite in meaning is 'permanent'.",
    "explanation_image_url": None,
    "topic": "Synonyms and Antonyms",
    "subtopic": "Antonyms",
    "difficulty": "Medium",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 30,
    "common_mistakes": "Selecting 'temporary' (which is the synonym) instead of the antonym 'permanent'.",
    "tags": ["vocabulary", "antonyms"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 4,
    "verified": True
})

# Q45
questions.append({
    "code": "NQT-0045",
    "question_text": "Fill in the blank with the correct set of words:\nIf we ______ the project on time, we ______ the contract for next year.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "complete, secure"},
        {"id": "B", "text": "will complete, will secure"},
        {"id": "C", "text": "complete, will secure"},
        {"id": "D", "text": "completed, will secure"}
    ],
    "correct_answer": "C",
    "explanation": "Step-by-step Solution:\n\nStep 1: Identify the type of conditional sentence.\nThis sentence describes a possible future condition and its probable result. This represents a First Conditional structure.\n\nStep 2: Recall the grammatical rules for First Conditionals.\n- The condition clause ('if' clause) takes the Simple Present tense.\n- The result clause takes the Future tense (will + base verb).\n\nStep 3: Apply the rule to the clauses.\n- If clause: 'If we [simple present] the project...' -> 'complete'\n- Result clause: '...we [will + base verb] the contract...' -> 'will secure'\n\nStep 4: Match with options.\nThis selection ('complete', 'will secure') corresponds to Option C.\n\nTherefore, option C is correct.",
    "explanation_image_url": None,
    "topic": "Sentence Completion",
    "subtopic": "Conditional Sentences",
    "difficulty": "Medium",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 30,
    "common_mistakes": "Using 'will' in both clauses ('will complete, will secure'), which violates English conditional grammar rules.",
    "tags": ["conditionals", "grammar", "verb-tenses"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q46
questions.append({
    "code": "NQT-0046",
    "question_text": "Read the passage and answer the question:\n\"Although biofuels are cleaner than traditional fossil fuels, their production requires massive amounts of agricultural land. Critics argue that diverting food crops like corn for fuel production pushes global food prices up, disproportionately affecting low-income nations.\"\nWhich of the following is the most logical inference from the passage?",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "Biofuels are not actually cleaner than fossil fuels."},
        {"id": "B", "text": "Biofuel production can have negative economic impacts on poor countries."},
        {"id": "C", "text": "Fossil fuels are cheaper to produce than biofuels."},
        {"id": "D", "text": "Low-income nations should not use biofuels."}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Analyze the statements in the passage.\n- Fact 1: Biofuels are cleaner than traditional fossil fuels.\n- Fact 2: Biofuel production requires significant agricultural land.\n- Fact 3: Diverting crops for fuel increases global food prices.\n- Fact 4: Raising food prices disproportionately affects low-income nations.\n\nStep 2: Evaluate the option inferences.\n- Option A: Contradicts Fact 1. Incorrect.\n- Option B: Combining Fact 3 and Fact 4 (raising food prices disproportionately affects low-income nations) logically implies that biofuel production can cause negative economic harm/impacts on poor countries. This is a direct, valid inference. Correct.\n- Option C: The passage does not compare the production costs of fossil fuels versus biofuels. Incorrect.\n- Option D: The passage describes consequences but does not offer recommendations or policy prescriptions on whether they should use it. Incorrect.\n\nTherefore, Option B is the most logical inference.",
    "explanation_image_url": None,
    "topic": "Reading Comprehension",
    "subtopic": "Logical Inference",
    "difficulty": "Medium",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 70,
    "common_mistakes": "Choosing A (which directly contradicts the statement 'biofuels are cleaner') or D (which is a recommendation, not a logical inference based strictly on the text).",
    "tags": ["reading-comprehension", "inference", "verbal-reasoning"],
    "source": "Inspired",
    "exam_year": 2024,
    "frequency": 4,
    "verified": True
})

# Q47
questions.append({
    "code": "NQT-0047",
    "question_text": "Select the correct meaning of the bold idiom in the sentence:\nThe detective had to **leave no stone unturned** to solve the complicated mystery case.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "destroy all evidence"},
        {"id": "B", "text": "try every possible course of action"},
        {"id": "C", "text": "give up searching"},
        {"id": "D", "text": "accuse innocent people"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Identify the bold idiom.\nThe idiom is 'leave no stone unturned'.\n\nStep 2: Recall the definition of the idiom.\n'Leave no stone unturned' originates from Greek drama/mythology and means to use every possible source, try every option, or exhaust all courses of action in search of a goal.\n\nStep 3: Evaluate the options.\n- 'destroy all evidence': Opposite of solving a case. Incorrect.\n- 'try every possible course of action': Directly aligns with the idiom definition. Correct.\n- 'give up searching': Opposite meaning. Incorrect.\n- 'accuse innocent people': Unrelated. Incorrect.\n\nTherefore, option B is correct.",
    "explanation_image_url": None,
    "topic": "Idioms and Phrases",
    "subtopic": "Idiom Meanings",
    "difficulty": "Easy",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 20,
    "common_mistakes": "Interpreting the phrase literally (moving stones) or choosing a negative action like A.",
    "tags": ["idioms", "vocabulary"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q48
questions.append({
    "code": "NQT-0048",
    "question_text": "Improve the underlined part of the sentence:\nIf I **was you**, I would have accepted the job offer immediately.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "was like you"},
        {"id": "B", "text": "were you"},
        {"id": "C", "text": "am you"},
        {"id": "D", "text": "No improvement needed"}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Analyze the sentence structure and meaning.\nThe sentence 'If I was you, I would have...' represents an imaginary, counterfactual, or hypothetical condition (I cannot literally be you).\n\nStep 2: Recall the grammar rule for hypothetical/subjunctive statements.\nIn formal English, imaginary or counterfactual conditional clauses require the subjunctive mood. The subjunctive past of 'to be' is always 'were' for all subjects (I, you, he, she, it, they).\n\nStep 3: Formulate the correction.\n'was you' must be corrected to 'were you' to satisfy the subjunctive requirement.\n\nStep 4: Match with options.\nThis corresponds to Option B.\n\nTherefore, option B is correct.",
    "explanation_image_url": None,
    "topic": "Sentence Improvement",
    "subtopic": "Subjunctive Mood",
    "difficulty": "Medium",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 35,
    "common_mistakes": "Thinking 'was' is correct because 'I' is singular, forgetting that imaginary conditionals require 'were'.",
    "tags": ["subjunctive", "grammar", "sentence-improvement"],
    "source": "Inspired",
    "exam_year": 2024,
    "frequency": 4,
    "verified": True
})

# Q49
questions.append({
    "code": "NQT-0049",
    "question_text": "Choose the option that represents the correct active voice of the sentence:\nThe road is being repaired by the municipal corporation.",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "The municipal corporation repaired the road."},
        {"id": "B", "text": "The municipal corporation is repairing the road."},
        {"id": "C", "text": "The municipal corporation was repairing the road."},
        {"id": "D", "text": "The municipal corporation repairs the road."}
    ],
    "correct_answer": "B",
    "explanation": "Step-by-step Solution:\n\nStep 1: Identify the subject, object, and verb in the passive sentence.\n- Passive Subject (receiver): 'The road'\n- Passive Agent (doer): 'the municipal corporation'\n- Passive Verb: 'is being repaired' (Present Continuous Passive)\n\nStep 2: Recall voice conversion rules for Present Continuous.\n- Passive structure: Subject + is/am/are + being + past participle (V3) + by + Agent\n- Active structure: Agent + is/am/are + present participle (V1-ing) + Subject\n\nStep 3: Convert the sentence.\n- Active Subject (Agent): 'The municipal corporation'\n- Active Verb: 'is repairing' (agrees with singular corporation)\n- Active Object (Subject): 'the road'\nCombined: 'The municipal corporation is repairing the road.'\n\nStep 4: Match with options.\nThis matches Option B.\n\nTherefore, option B is correct.",
    "explanation_image_url": None,
    "topic": "Active and Passive Voice",
    "subtopic": "Voice Conversion",
    "difficulty": "Easy",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 30,
    "common_mistakes": "Changing the tense of the sentence (e.g., choosing A which is simple past, or C which is past continuous).",
    "tags": ["voice", "grammar", "active-voice"],
    "source": "Original",
    "exam_year": 2024,
    "frequency": 5,
    "verified": True
})

# Q50
questions.append({
    "code": "NQT-0050",
    "question_text": "Convert the following direct speech to indirect speech:\nHe said to me, \"Where are you going?\"",
    "question_image_url": None,
    "options": [
        {"id": "A", "text": "He asked me where I was going."},
        {"id": "B", "text": "He told me where I was going."},
        {"id": "C", "text": "He asked me where was I going."},
        {"id": "D", "text": "He asked me that where was I going."}
    ],
    "correct_answer": "A",
    "explanation": "Step-by-step Solution:\n\nStep 1: Convert the reporting verb.\nSince the direct speech is a question, 'said to me' changes to 'asked me'.\n\nStep 2: Convert the connecting word.\nFor WH-questions (where, what, why, etc.), the question word itself acts as the connector. Do NOT use the conjunction 'that'.\n\nStep 3: Convert the question clause structure.\nThe question 'Where are you going?' (interrogative structure: Verb + Subject) must change into an assertive structure (Subject + Verb) in indirect speech:\n- Direct: 'where are [verb] you [subject] going?'\n- Indirect: 'where I [subject] was [verb] going'\n\nStep 4: Shift pronouns and tenses.\n- Pronoun: 'you' changes to 'I' (agrees with the object of reporting verb, 'me').\n- Tense: Present Continuous ('are going') shifts to Past Continuous ('was going').\n\nCombining the steps: 'He asked me where I was going.'\nThis matches Option A.\n\nTherefore, option A is correct.",
    "explanation_image_url": None,
    "topic": "Direct and Indirect Speech",
    "subtopic": "Speech Conversion",
    "difficulty": "Medium",
    "section": "Verbal Ability",
    "question_type": "MCQ",
    "estimated_solve_time": 40,
    "common_mistakes": "Retaining the question word order ('where was I going' instead of 'where I was going') or incorrectly adding 'that' (Option D).",
    "tags": ["speech", "indirect-speech", "grammar"],
    "source": "Inspired",
    "exam_year": 2023,
    "frequency": 4,
    "verified": True
})

print(f"Total questions generated: {len(questions)}")

# Write to file
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
output_path = os.path.join(base_dir, "database", "questions.json")
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

print(f"Successfully wrote {len(questions)} questions to {output_path}")
