--AU_Student_Website_DatabaseSchema
--Role:Database Administrator/System_Architect

-- StudentSphere AU - Database Design
-- Role: Database Administrator

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student','lecturer','admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_profiles (
    profile_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    student_id_number VARCHAR(50) UNIQUE,
    department VARCHAR(100),
    year_of_study INT,
    gpa DECIMAL(3,2),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- This table powers the page you sent: /student/achievements
CREATE TABLE achievements (
    achievement_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(150) NOT NULL,
    category ENUM('academic','certificate','qualification','award','internship') NOT NULL,
    issuer VARCHAR(100),
    description TEXT,
    date_achieved DATE,
    document_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE academic_results (
    result_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    course_code VARCHAR(20),
    course_name VARCHAR(100),
    grade VARCHAR(10),
    semester VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE recommendation_requests (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    lecturer_id INT,
    purpose TEXT,
    status ENUM('pending','approved','rejected','completed') DEFAULT 'pending',
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(user_id),
    FOREIGN KEY (lecturer_id) REFERENCES users(user_id)
);

CREATE TABLE recommendation_letters (
    letter_id INT PRIMARY KEY AUTO_INCREMENT,
    request_id INT UNIQUE,
    letter_content TEXT,
    issued_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES recommendation_requests(request_id)
);
