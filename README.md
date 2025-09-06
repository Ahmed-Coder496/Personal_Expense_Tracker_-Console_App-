# Personal_Expense_Tracker_-Console_App-
Project Overview
The project is a Personal Expense Tracker (Console App) where the user can manage their expenses
with full CRUD functionality. Each expense belongs to a category and sub-category, has a unique
sequential ID, and is saved in a JSON file for persistence. Deletions include an undo confirmation.
Reports, sorting, and filtering will give a clear analysis of the data.
Key Features
1. Categories & Subcategories (Fixed)
- There will be exactly 3 main categories.
- Each category will have 2 sub-categories.
Example:
Food → Restaurant, Grocery
Travel → Taxi, Flight
Bills → Electricity, Internet
2. Expense ID
- Each expense will have a unique ID starting from 1.
- IDs will always increment by 1 for new entries.
- No random numbers will be used.
3. Currency
- All amounts will be stored and displayed in USD ($).
4. Delete with Undo
- When user deletes an expense:
- The system will wait 5 seconds.
- It will ask: “Do you want to undo your action?”
- If user says Yes, the expense will not be deleted.
- If user says No, it will be permanently deleted from the entire application and JSON file.
5. CRUD
- Create → Add new expense.
- Read → View all expenses.
- Update → Edit expense by ID.
- Delete → Remove expense with undo confirmation.
6. Sorting Options
- By amount (low → high, high → low).
- By date (old → new, new → old).
- By category/sub-category.
- By description (A–Z, Z–A).
- Multi-level (e.g., sort by category then by amount).
7. Filtering & Search
- By category/sub-category.
- By date range.
- By amount range.
- By keyword in description.
- Combination filters (e.g., “Food” in September under $100).
8. Reports
- Total expenses (all-time, monthly, weekly).
- Category-wise breakdown.
- Sub-category breakdown.
- Highest & lowest expense (overall, monthly, category-wise).
- Average spending.
- Spending trends.
Data Structure of One Expense (Example)
{
id: 1,
amount: 25.50,
category: "Food",
subCategory: "Restaurant",
description: "Lunch at McDonald’s",
date: "2025-09-05T14:30:00.000Z"
}
Development Rules
- Work in a full modular and structured way.
- Follow clean coding principles (separate files for logic, storage, reporting, etc.).
- Architecture should be maintainable.
- No shortcuts, no messy code.
- No AI generated code will be accepted.
- Strict timeline: 5th September – 15th September (10 days). 
