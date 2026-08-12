from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.aptitude_question import AptitudeQuestion


COMPANY_QUESTIONS = [

    # =====================================================
    # TCS
    # =====================================================

    {
        "question": "A person spends 75% of their income. If their income is ₹40,000, how much do they save?",
        "option_a": "₹8,000",
        "option_b": "₹10,000",
        "option_c": "₹12,000",
        "option_d": "₹15,000",
        "correct_answer": "B",
        "explanation": "Savings = 25% of ₹40,000 = ₹10,000.",
        "category": "Quantitative",
        "company": "TCS",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "A train 120 m long crosses a pole in 6 seconds. What is its speed?",
        "option_a": "60 km/h",
        "option_b": "72 km/h",
        "option_c": "80 km/h",
        "option_d": "90 km/h",
        "correct_answer": "B",
        "explanation": "Speed = 120/6 = 20 m/s. Converting to km/h: 20 × 18/5 = 72 km/h.",
        "category": "Quantitative",
        "company": "TCS",
        "difficulty": "Medium",
        "marks": 1,
    },

    {
        "question": "Find the next number: 5, 11, 23, 47, ?",
        "option_a": "91",
        "option_b": "93",
        "option_c": "95",
        "option_d": "97",
        "correct_answer": "C",
        "explanation": "Each number is multiplied by 2 and increased by 1. 47 × 2 + 1 = 95.",
        "category": "Logical",
        "company": "TCS",
        "difficulty": "Medium",
        "marks": 1,
    },

    {
        "question": "If COMPUTER is coded as DPNQVUFS, how is SOFTWARE coded using the same pattern?",
        "option_a": "TPGUXBSF",
        "option_b": "TPGUXBSE",
        "option_c": "UQHVYCTG",
        "option_d": "SOFTWARE",
        "correct_answer": "A",
        "explanation": "Each letter is shifted one position forward in the alphabet.",
        "category": "Logical",
        "company": "TCS",
        "difficulty": "Medium",
        "marks": 1,
    },

    {
        "question": "Choose the grammatically correct sentence.",
        "option_a": "Neither of the candidates were selected.",
        "option_b": "Neither of the candidates was selected.",
        "option_c": "Neither of the candidate were selected.",
        "option_d": "Neither candidates was selected.",
        "correct_answer": "B",
        "explanation": "The subject 'neither' is singular, so 'was' is used.",
        "category": "Verbal",
        "company": "TCS",
        "difficulty": "Medium",
        "marks": 1,
    },


    # =====================================================
    # INFOSYS
    # =====================================================

    {
        "question": "A sum of ₹5,000 is invested at 8% simple interest per annum for 2 years. What is the interest?",
        "option_a": "₹400",
        "option_b": "₹600",
        "option_c": "₹800",
        "option_d": "₹1,000",
        "correct_answer": "C",
        "explanation": "SI = P × R × T / 100 = 5000 × 8 × 2 / 100 = ₹800.",
        "category": "Quantitative",
        "company": "Infosys",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "The ratio of boys to girls in a class is 3:2. If there are 25 students, how many are boys?",
        "option_a": "10",
        "option_b": "12",
        "option_c": "15",
        "option_d": "18",
        "correct_answer": "C",
        "explanation": "Total ratio = 5. Boys = 3/5 × 25 = 15.",
        "category": "Quantitative",
        "company": "Infosys",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "Find the odd one out: 8, 27, 64, 100, 125",
        "option_a": "27",
        "option_b": "64",
        "option_c": "100",
        "option_d": "125",
        "correct_answer": "C",
        "explanation": "8, 27, 64 and 125 are cubes. 100 is not a perfect cube.",
        "category": "Logical",
        "company": "Infosys",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "If NORTH is coded as OPSUI, how is SOUTH coded?",
        "option_a": "TPVUI",
        "option_b": "TPVTH",
        "option_c": "TPVUK",
        "option_d": "SPVUI",
        "correct_answer": "A",
        "explanation": "Each letter is shifted one position forward.",
        "category": "Logical",
        "company": "Infosys",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "Choose the word closest in meaning to 'Prudent'.",
        "option_a": "Careless",
        "option_b": "Wise",
        "option_c": "Reckless",
        "option_d": "Confused",
        "correct_answer": "B",
        "explanation": "Prudent means acting with care and good judgment.",
        "category": "Verbal",
        "company": "Infosys",
        "difficulty": "Medium",
        "marks": 1,
    },


    # =====================================================
    # ACCENTURE
    # =====================================================

    {
        "question": "A product marked at ₹2,000 is sold at a 15% discount. What is the selling price?",
        "option_a": "₹1,600",
        "option_b": "₹1,650",
        "option_c": "₹1,700",
        "option_d": "₹1,750",
        "correct_answer": "C",
        "explanation": "Discount = 15% of ₹2,000 = ₹300. Selling price = ₹1,700.",
        "category": "Quantitative",
        "company": "Accenture",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "A can complete a task in 10 days and B can complete it in 15 days. How long will they take together?",
        "option_a": "5 days",
        "option_b": "6 days",
        "option_c": "7 days",
        "option_d": "8 days",
        "correct_answer": "B",
        "explanation": "Combined rate = 1/10 + 1/15 = 1/6. Therefore, they take 6 days.",
        "category": "Quantitative",
        "company": "Accenture",
        "difficulty": "Medium",
        "marks": 1,
    },

    {
        "question": "Find the next number: 4, 9, 19, 39, ?",
        "option_a": "77",
        "option_b": "79",
        "option_c": "81",
        "option_d": "83",
        "correct_answer": "B",
        "explanation": "Each number is multiplied by 2 and increased by 1. 39 × 2 + 1 = 79.",
        "category": "Logical",
        "company": "Accenture",
        "difficulty": "Medium",
        "marks": 1,
    },

    {
        "question": "If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?",
        "option_a": "Father",
        "option_b": "Brother",
        "option_c": "Uncle",
        "option_d": "Cousin",
        "correct_answer": "C",
        "explanation": "A is the brother of C. Since C is D's father, A is D's uncle.",
        "category": "Logical",
        "company": "Accenture",
        "difficulty": "Medium",
        "marks": 1,
    },

    {
        "question": "Choose the antonym of 'Transparent'.",
        "option_a": "Clear",
        "option_b": "Visible",
        "option_c": "Opaque",
        "option_d": "Open",
        "correct_answer": "C",
        "explanation": "Opaque means not allowing light to pass through and is the opposite of transparent.",
        "category": "Verbal",
        "company": "Accenture",
        "difficulty": "Easy",
        "marks": 1,
    },


    # =====================================================
    # DELOITTE
    # =====================================================

    {
        "question": "The average age of 5 people is 24 years. If one person aged 20 leaves, what is the new average?",
        "option_a": "24",
        "option_b": "25",
        "option_c": "26",
        "option_d": "27",
        "correct_answer": "B",
        "explanation": "Total age = 5 × 24 = 120. Remaining total = 100. New average = 100/4 = 25.",
        "category": "Quantitative",
        "company": "Deloitte",
        "difficulty": "Medium",
        "marks": 1,
    },

    {
        "question": "A car travels 150 km at 50 km/h and another 150 km at 75 km/h. What is its average speed?",
        "option_a": "55 km/h",
        "option_b": "58 km/h",
        "option_c": "60 km/h",
        "option_d": "62 km/h",
        "correct_answer": "C",
        "explanation": "Total distance = 300 km. Total time = 150/50 + 150/75 = 3 + 2 = 5 hours. Average speed = 60 km/h.",
        "category": "Quantitative",
        "company": "Deloitte",
        "difficulty": "Medium",
        "marks": 1,
    },

    {
        "question": "Complete the series: 1, 4, 9, 16, 25, ?",
        "option_a": "30",
        "option_b": "32",
        "option_c": "36",
        "option_d": "49",
        "correct_answer": "C",
        "explanation": "These are consecutive squares: 1², 2², 3², 4², 5². Next is 6² = 36.",
        "category": "Logical",
        "company": "Deloitte",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "If all managers are employees and some employees are developers, which statement is definitely true?",
        "option_a": "All developers are managers",
        "option_b": "All managers are employees",
        "option_c": "No developers are employees",
        "option_d": "Some managers are developers",
        "correct_answer": "B",
        "explanation": "The first statement directly establishes that all managers belong to the employee group.",
        "category": "Logical",
        "company": "Deloitte",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "Choose the synonym of 'Eloquent'.",
        "option_a": "Articulate",
        "option_b": "Silent",
        "option_c": "Confusing",
        "option_d": "Brief",
        "correct_answer": "A",
        "explanation": "Eloquent means fluent or persuasive in speaking or writing.",
        "category": "Verbal",
        "company": "Deloitte",
        "difficulty": "Medium",
        "marks": 1,
    },


    # =====================================================
    # COGNIZANT
    # =====================================================

    {
        "question": "If 30% of a number is 45, what is the number?",
        "option_a": "120",
        "option_b": "135",
        "option_c": "150",
        "option_d": "180",
        "correct_answer": "C",
        "explanation": "0.30 × number = 45, therefore number = 45/0.30 = 150.",
        "category": "Quantitative",
        "company": "Cognizant",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "A man buys an article for ₹1,200 and sells it for ₹1,500. What is his profit percentage?",
        "option_a": "20%",
        "option_b": "22%",
        "option_c": "25%",
        "option_d": "30%",
        "correct_answer": "C",
        "explanation": "Profit = ₹300. Profit percentage = 300/1200 × 100 = 25%.",
        "category": "Quantitative",
        "company": "Cognizant",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "Find the missing number: 7, 14, 28, 56, ?",
        "option_a": "84",
        "option_b": "98",
        "option_c": "112",
        "option_d": "120",
        "correct_answer": "C",
        "explanation": "Each number is doubled. 56 × 2 = 112.",
        "category": "Logical",
        "company": "Cognizant",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "A person faces east, turns right, then turns right again. Which direction is the person facing?",
        "option_a": "North",
        "option_b": "South",
        "option_c": "East",
        "option_d": "West",
        "correct_answer": "D",
        "explanation": "Facing east → right turn gives south → another right turn gives west.",
        "category": "Logical",
        "company": "Cognizant",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "Choose the correctly spelled word.",
        "option_a": "Accomodation",
        "option_b": "Acommodation",
        "option_c": "Accommodation",
        "option_d": "Accommadation",
        "correct_answer": "C",
        "explanation": "The correct spelling is 'Accommodation'.",
        "category": "Verbal",
        "company": "Cognizant",
        "difficulty": "Easy",
        "marks": 1,
    },


    # =====================================================
    # WIPRO
    # =====================================================

    {
        "question": "A number is decreased by 10% and then increased by 10%. What is the net change?",
        "option_a": "1% increase",
        "option_b": "1% decrease",
        "option_c": "No change",
        "option_d": "2% increase",
        "correct_answer": "B",
        "explanation": "Assume 100. After 10% decrease = 90. Increasing 90 by 10% gives 99. Therefore, there is a 1% decrease.",
        "category": "Quantitative",
        "company": "Wipro",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "The ratio of two numbers is 4:5 and their sum is 81. What is the larger number?",
        "option_a": "36",
        "option_b": "40",
        "option_c": "45",
        "option_d": "50",
        "correct_answer": "C",
        "explanation": "Total parts = 9. Larger number = 5/9 × 81 = 45.",
        "category": "Quantitative",
        "company": "Wipro",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "Find the next number: 10, 20, 40, 80, ?",
        "option_a": "120",
        "option_b": "140",
        "option_c": "160",
        "option_d": "180",
        "correct_answer": "C",
        "explanation": "Each number is multiplied by 2. 80 × 2 = 160.",
        "category": "Logical",
        "company": "Wipro",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "If APPLE is coded as BQQMF, how is MANGO coded?",
        "option_a": "NBOHP",
        "option_b": "NBPHO",
        "option_c": "NBNHP",
        "option_d": "MBOHP",
        "correct_answer": "A",
        "explanation": "Each letter is shifted one position forward.",
        "category": "Logical",
        "company": "Wipro",
        "difficulty": "Easy",
        "marks": 1,
    },

    {
        "question": "Choose the antonym of 'Optimistic'.",
        "option_a": "Hopeful",
        "option_b": "Positive",
        "option_c": "Pessimistic",
        "option_d": "Confident",
        "correct_answer": "C",
        "explanation": "Pessimistic is the opposite of optimistic.",
        "category": "Verbal",
        "company": "Wipro",
        "difficulty": "Easy",
        "marks": 1,
    },
]


def seed_company_questions():

    db: Session = SessionLocal()

    try:

        inserted = 0

        for question_data in COMPANY_QUESTIONS:

            exists = (
                db.query(AptitudeQuestion)
                .filter(
                    AptitudeQuestion.question
                    == question_data["question"]
                )
                .first()
            )

            if exists:
                continue

            question = AptitudeQuestion(
                **question_data
            )

            db.add(question)
            inserted += 1

        db.commit()

        print(
            f"Successfully inserted "
            f"{inserted} company-specific aptitude questions."
        )

    finally:

        db.close()


if __name__ == "__main__":
    seed_company_questions()