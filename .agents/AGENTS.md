# Workspace Rules & Guidelines - GetPrime

## TCS NQT Question Engine & UI Guidelines

1. **Internal-Only Difficulty Metadata**:
   - Do **NOT** expose the difficulty level (Easy, Medium, Hard) anywhere in the student-facing test interface or review dashboards.
   - The test interface must closely replicate the real TCS NQT experience, where students are not informed of question difficulty.
   - Use the `difficulty` field strictly for background processes: question organization, paper generation (e.g., selecting X easy, Y medium, Z hard questions behind the scenes), internal analytics, and administrator tools.

2. **Preserve Natural Difficulty Distributions**:
   - Do **NOT** artificially rebalance the question bank to force a uniform (e.g., 33% each) or arbitrary difficulty ratio.
   - The database should preserve the natural difficulty distribution of actual TCS NQT past papers and pattern-inspired questions, which inherently lean towards **Medium** and **Hard** problems.
