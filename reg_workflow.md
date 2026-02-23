1. Core Architectural Principles
•	Immutable Numeric Identity: The database-generated ID is the source of truth. All permissions and application-specific settings must link to this number.
•	Decoupled Email: The email address is an attribute of the user, not the identifier. This allows for future email changes without breaking permission links.
•	The Triage Gate: Users must prove they own the email (Verification) before an Admin is notified. This ensures the Admin only reviews "clean" requests.
•	Post-Approval Credentials: Passwords are not stored until the Admin has granted access, keeping your database "cleaner" and more secure.
________________________________________
2. The User State Machine
The user record will transition through these states in your database:
Status	Description
PENDING_VERIFICATION	User has signed up; email verification link is sent.
PENDING_APPROVAL	Email is verified; Admin is notified to review.
APPROVED	Admin granted access; "Set Password" invite sent to user.
ACTIVE	Password is set; User is fully authorized.
REJECTED	Request declined; User notified with Admin's feedback.
________________________________________
3. The Registration Workflow
Phase 1: Submission
•	User Action: Enters Email, First Name, Last Name, and Note (max 256 chars; default: "Requesting login id to system").
•	System Action:
1.	Checks if the email exists. (If yes, return a generic success message to prevent user enumeration).
2.	Creates a new record. The DB generates the Numeric ID.
3.	Sets status to PENDING_VERIFICATION.
4.	Sends a verification link with a short-lived token to the user.
•	UI: Display a message confirming the request and advising the user to check their email. Provide the Admin's contact email for questions.
Phase 2: Email Verification
•	User Action: Clicks the link in their email.
•	System Action:
1.	Validates the token.
2.	Updates status to PENDING_APPROVAL.
3.	Async Communication: Sends an alert to the Admin containing the user's details and their request note.
Phase 3: Administrative Review
•	Admin Action: Views the request in the Admin Dashboard.
•	Approval Path:
1.	Admin initializes permissions/roles for the User ID.
2.	Admin clicks Approve.
3.	Status updates to APPROVED.
4.	System sends an "Account Approved" email with a Password Setup Link.
•	Rejection Path:
1.	Admin enters a reason for rejection.
2.	Status updates to REJECTED.
3.	System emails the user with the Admin's note and instructions.
Phase 4: Credential Setup
•	User Action: Clicks the Setup Link from the approval email.
•	UI: User enters and confirms their password.
•	Validation: Must match and meet the PWD_REG requirements in @userSchema.
•	Security: System hashes the password (using bcrypt or Argon2) and saves it.
•	Completion: Status updates to ACTIVE. User is redirected to login.
________________________________________
4. Technical Requirements
Security
•	In-Flight: All data must be protected via TLS (HTTPS). JWTs should be used for session management only after the user reaches the ACTIVE state.
•	Encryption: Use modern password hashing. Ensure that during the "Set Password" phase, the password is encrypted using your DB's chosen method (e.g., bcrypt) immediately before being stored.
•	Authorization: Ensure that your UI components and API routes check permissions based on the Numeric ID and session token, not just the presence of a token.
Database Schema (Target State)
•	user_id: INT / BIGINT (Primary Key, Auto-increment)
•	email: VARCHAR (Unique Index)
•	first_name / last_name: VARCHAR
•	status: ENUM (e.g., PENDING_VERIFY, ACTIVE, etc.)
•	request_note: VARCHAR(256)
•	password_hash: VARCHAR (Nullable until password setup)
•	admin_rejection_note: TEXT (Nullable)
________________________________________
5. Summary Table for Developers
Step	Trigger	State Change	Async Action
Sign Up	Form Submit	null → PENDING_VERIFICATION	Email (Verify Link)
Verify	Link Click	...VERIFICATION → PENDING_APPROVAL	Notify Admin
Approve	Admin Action	...APPROVAL → APPROVED	Email (Setup Link)
Set PWD	Form Submit	APPROVED → ACTIVE	None (Success)