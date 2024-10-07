Project Considerations:

- The project should be a website that is a total of 4 views.
    1. Login/Signup Page
    2. Home Page
    3. View Post Page
    4. Create Post Page
- The website should be a blog website that allows users to: 
    a. create an account 
    b. login to their acount
    c. create post
    d. view post
    e. edit post
    f. delete post
    g. sign out
- Bootstrap must be used for the styling of the website.
- The website must be responsive and compatible with all devices.


- PROJECT DIRECTORY STRUCTURE:

project-directory/
│
├── assets/
│   ├── css/
│   │   └── styles.css         # Custom CSS styles (optional if using Bootstrap customization)
│   └── images/                # Images used on the website (e.g., default avatars, logos)
│
├── js/
│   ├── auth.js                # Handles login, signup, and logout functionality
│   ├── posts.js               # Handles post-related actions (create, view, edit, delete)
│   ├── firebase.js            # Firebase configuration and initialization
│   ├── utils.js               # Utility functions (e.g., form validation, URL management)
│   └── main.js                # Global event listeners and page navigation logic
│
├── views/
│   ├── login.html             # Login/Signup Page
│   ├── home.html              # Home Page (displays posts and allows post interaction)
│   ├── view-post.html         # View a specific post
│   └── create-post.html       # Create/Edit post form
│
├── index.html                 # Entry point, can redirect to login/home based on authentication state
├── README.md                  # Project overview, instructions, etc.
└── package.json               # Optional: If using npm for dependency management (e.g., Firebase, other libraries)




