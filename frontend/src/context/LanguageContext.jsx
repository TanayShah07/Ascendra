import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const LanguageContext = createContext();

const DEFAULT_LANGUAGE = "en-US";

const translations = {

    // =====================================================
    // ENGLISH (US)
    // =====================================================

    "en-US": {

        sidebar: {
            dashboard: "Dashboard",
            interview: "Interview",
            groupDiscussion: "Group Discussion",
            preparation: "Preparation Hub",
            resume: "Resume Analysis",
            roadmap: "Roadmap",
            profile: "Profile",
            settings: "Settings",
            logout: "Logout"
        },

        settings: {

            title: "Settings",

            subtitle:
                "Manage your Ascendra preferences and account settings.",

            appearance: "Appearance",

            appearanceDescription:
                "Choose how Ascendra looks.",

            light: "Light",

            dark: "Dark",

            system: "System",

            language: "Language",

            languageDescription:
                "Choose the language used across Ascendra.",

            changePassword: "Change Password",

            changePasswordDescription:
                "Update your account password.",

            notifications: "Notifications",

            notificationsDescription:
                "Manage your Ascendra notifications.",

            emailNotifications:
                "Email Notifications",

            emailNotificationsDescription:
                "Receive important updates by email.",

            preparationReminders:
                "Preparation Reminders",

            preparationRemindersDescription:
                "Get reminders about your preparation.",

            interviewReminders:
                "Interview & GD Reminders",

            interviewRemindersDescription:
                "Receive reminders for upcoming practice.",

            preparationPreferences:
                "Preparation Preferences",

            preparationPreferencesDescription:
                "Customize how you prepare for placements.",

            dailyGoal:
                "Daily Preparation Goal",

            difficulty:
                "Preferred Difficulty",

            privacyData:
                "Privacy & Data",

            privacyDataDescription:
                "Manage how your Ascendra data is used.",

            personalization:
                "Personalization",

            personalizationDescription:
                "Allow Ascendra to use your activity and performance to personalize recommendations.",

            exportData:
                "Export My Data",

            logout:
                "Logout",

            logoutDescription:
                "Sign out of your Ascendra account."

        },

        dashboard: {

            welcome:
                "Welcome Back",

            greeting:
                "Ready to ace your next interview?",

            level:
                "Level",

            currentStreak:
                "Current Streak",

            days:
                "Days",

            xp:
                "XP",

            interviews:
                "Interviews",

            readiness:
                "Readiness",

            startAIInterview:
                "Start AI Interview",

            startAIInterviewDescription:
                "Practice with AI and improve your interview skills.",

            resumeAnalysis:
                "Resume Analysis",

            resumeAnalysisDescription:
                "Get ATS score and AI-powered resume suggestions.",

            start:
                "Start",

            analyze:
                "Analyze"

        },

        interview: {
            chooseMode: "Choose Interview Mode",
            selectPracticeMode: "Select how you'd like to practice today.",

            aiMockInterview: "AI Mock Interview",
            aiMockInterviewDescription:
                "Practice subject-wise technical and HR interviews with AI.",

            companyInterview: "Company Specific Interview",
            companyInterviewDescription:
                "Experience interviews based on real company patterns.",

            backToInterview: "Back to Interview",

            configureInterview: "Configure your interview before starting.",

            subject: "Subject",
            selectSubject: "Select Subject",

            difficulty: "Difficulty",
            easy: "Easy",
            medium: "Medium",
            hard: "Hard",

            duration: "Duration",
            durationMinutes: "Interview Duration",

            language: "Language",

            startInterview: "Start Interview",
            startCompanyInterview: "Start Company Interview",

            company: "Company",
            selectCompany: "Select Company",

            jobRole: "Job Role",
            selectRole: "Select Role"
        },

        groupDiscussion: {

            title: "Group Discussion",

            description:
                "Practice group discussions and improve your communication, confidence and teamwork.",

            backToInterview:
                "Back to Interview",

            selectMode:
                "Select Discussion Mode",

            selectModeDescription:
                "Choose how you would like to practice your group discussion.",

            aiDiscussion:
                "AI Group Discussion",

            aiDiscussionDescription:
                "Practice with AI participants and receive performance feedback.",

            peerDiscussion:
                "Peer Group Discussion",

            peerDiscussionDescription:
                "Practice with other candidates in a real-time group discussion.",

            topic:
                "Discussion Topic",

            selectTopic:
                "Select Topic",

            customTopic:
                "Custom Topic",

            enterTopic:
                "Enter your discussion topic",

            difficulty:
                "Difficulty",

            easy:
                "Easy",

            medium:
                "Medium",

            hard:
                "Hard",

            duration:
                "Duration",

            language:
                "Language",

            participants:
                "Participants",

            invite:
                "Invite Participants",

            roomCode:
                "Room Code",

            enterRoomCode:
                "Enter Room Code",

            joinRoom:
                "Join Room",

            copyInvite:
                "Copy Invite Link",

            startDiscussion:
                "Start Group Discussion",

            aiPreview:
                "AI Participant Preview",

            aiParticipants:
                "AI Participants",

            communication:
                "Communication",

            confidence:
                "Confidence",

            teamwork:
                "Teamwork",

            relevance:
                "Relevance"
        },

        resume: {

            title:
                "Resume Intelligence",

            description:
                "Upload your resume and receive AI-powered ATS scoring, recruiter insights and interview preparation.",

            aiResumeAnalysis:
                "AI Resume Analysis",

            uploadDescription:
                "Upload your latest resume and customize the analysis according to your dream company and role.",

            dragDrop:
                "Drag & Drop Resume",

            // Used by ResumeUpload
            dragAndDrop:
                "Drag & Drop Resume",

            fileFormat:
                "PDF or DOCX • Maximum 5 MB",

            fileTypes:
                "PDF or DOCX",

            maxSize:
                "Maximum 5 MB",

            chooseResume:
                "Choose Resume",

            targetCompany:
                "Target Company",

            selectTargetCompany:
                "Select Target Company",

            targetRole:
                "Target Role",

            selectTargetRole:
                "Select Target Role",

            experienceLevel:
                "Experience Level",

            fresher:
                "Fresher",

            intern:
                "Intern",

            zeroToTwo:
                "0-2 Years",

            twoToFive:
                "2-5 Years",

            // Used by ResumeUpload
            experience: {

                fresher:
                    "Fresher",

                intern:
                    "Intern",

                zeroToTwo:
                    "0-2 Years",

                twoToFive:
                    "2-5 Years"
            },

            resumeVersion:
                "Resume Version",

            latestResume:
                "Latest Resume",

            versionTwo:
                "Version 2",

            versionOne:
                "Version 1",

            // Used by ResumeUpload
            version: {

                latest:
                    "Latest Resume",

                versionTwo:
                    "Version 2",

                versionOne:
                    "Version 1"
            },

            analyzeResume:
                "Analyze Resume",

            // Used by ResumeUpload
            analyzeButton:
                "Analyze Resume",

            readyForAnalysis:
                "Ready for AI Analysis",

            analysisDescription:
                "Upload your resume and click Analyze Resume to generate:",

            atsScore:
                "ATS Score",

            missingKeywords:
                "Missing Keywords",

            companyMatch:
                "Company Match",

            aiSuggestions:
                "AI Suggestions",

            resumeInterview:
                "Resume Interview"
        },

        profile: {

            title:
                "Profile",

            completeProfile:
                "Complete your profile to improve your placement readiness.",

            personalInformation:
                "Personal Information",

            professionalProfiles:
                "Professional Profiles",

            placementReadiness:
                "Placement Readiness",

            readiness:
                "Readiness",

            readinessDescription:
                "Your placement readiness based on your current performance.",

            readinessBreakdown:
                "Readiness Breakdown",

            breakdownDescription:
                "See how each area contributes to your overall placement readiness.",

            loadingBreakdown:
                "Loading readiness breakdown...",

            placementReady:
                "Placement Ready",

            advanced:
                "Advanced",

            intermediate:
                "Intermediate",

            developing:
                "Developing",

            beginner:
                "Beginner",

            profile:
                "Profile",

            placementGoals:
                "Placement Goals",

            resume:
                "Resume",

            coding:
                "Coding",

            interview:
                "Interview",

            groupDiscussion:
                "Group Discussion",

            roadmap:
                "Roadmap",

            statistics:
                "Statistics",

            achievements:
                "Achievements",

            skills:
                "Skills",

            insights:
                "Insights",

            activity:
                "Activity",

            edit:
                "Edit",

            save:
                "Save",

            cancel:
                "Cancel",

            add:
                "Add",

            name:
                "Full Name",

            fullName:
                "Full Name",

            email:
                "Email",

            college:
                "College",

            branch:
                "Branch",

            graduationYear:
                "Graduation Year",

            github:
                "GitHub",

            linkedin:
                "LinkedIn",

            portfolio:
                "Portfolio",

            leetcode:
                "LeetCode",

            addSkill:
                "Add Skill",

            currentStreak:
                "Current Streak",

            interviews:
                "Interviews",

            xp:
                "XP",

            resumeScore:
                "Resume Score",

            interviewScore:
                "Interview Score",

            gdScore:
                "GD Score",

            professionalProfile:
                "Professional Profile",

            linkedinDescription:
                "Add your LinkedIn profile",

            githubDescription:
                "Add your GitHub profile",

            portfolioDescription:
                "Add your portfolio website",

            leetcodeDescription:
                "Add your LeetCode profile",

            enterProfileUrl:
                "Enter profile URL for",

            updateProfileError:
                "Failed to update profile.",

            updateGoalsError:
                "Failed to update placement goals.",

            dreamCompany:
                "Dream Company",

            targetRole:
                "Target Role",

            preferredDomain:
                "Preferred Domain",

            notSelected:
                "Not selected",

            resumeUploads:
                "Resume Uploads",

            lastUpload:
                "Last Upload",

            average:
                "Average",

            gdSessions:
                "GD Sessions",

            rating:
                "Rating",

            recentActivity:
                "Recent Activity",

            joinedAscendra:
                "Joined Ascendra",

            noResume:
                "No resume uploaded yet",

            noCoding:
                "No coding practice yet",

            noInterviews:
                "No interviews completed yet",

            firstResume:
                "First Resume",

            firstInterview:
                "First Interview",

            hundredCoding:
                "100 Coding Problems",

            thirtyDayStreak:
                "30 Day Streak",

            aiInsights:
                "AI Insights",

            resumeAnalysis:
                "Complete Resume Analysis",

            codingPractice:
                "Complete Coding Practice",

            mockInterview:
                "Complete a Mock Interview",

            groupDiscussionInsight:
                "Complete a Group Discussion",

            generateRoadmap:
                "Generate your personalized roadmap",

            emptyState:
                "No data available yet. Start practicing to build your profile.",

            noAchievements:
                "Your achievements will appear here as you progress.",

            noInsights:
                "Complete more activities to receive personalized insights.",

            noActivity:
                "Your recent activity will appear here."

        },

        roadmap: {

            title:
                "AI Career Roadmap",

            description:
                "Generate a personalized placement roadmap using AI based on your dream role, company and current skill level.",

            googleSDE:
                "Google SDE",

            aiEngineer:
                "AI Engineer",

            dataScientist:
                "Data Scientist",

            fullStackDeveloper:
                "Full Stack Developer",

            mlEngineer:
                "ML Engineer",

            goalLabel:
                "What's your goal?",

            goalPlaceholder:
                "Example: I want to become an AI Engineer at NVIDIA within 8 months.",

            generateRoadmap:
                "Generate Roadmap",

            roadmapWillAppear:
                "Roadmap will appear here.",

            personalizedRoadmaps:
                "AI Personalized Roadmaps",

            personalizedRoadmapsDescription:
                "Ascendra AI will generate weekly learning plans, coding schedules, interview preparation, resume milestones and personalized recommendations based on your progress."

        },

        landing: {

    nav: {
        home: "Home",
        features: "Features",
        technology: "Technology",
        about: "About",
        login: "Login",
        getStarted: "Get Started"
    },

    hero: {
        badge: "Multimodal AI Interview Intelligence Platform",

        titleLine1: "Prepare Smarter.",
        titleLine2: "Perform Better.",

        description:
            "Ascendra is an AI-powered placement readiness platform that combines NLP, Deep Learning, Computer Vision, and Speech Intelligence to simulate real interviews, assess technical and communication skills, and generate personalized feedback with adaptive learning roadmaps.",

        getStarted: "Get Started",
        watchDemo: "Watch Demo",

        aiModules: "AI Modules",
        assessmentTypes: "Assessment Types",
        personalizedFeedback: "Personalized Feedback"
    },

    features: {

        label: "FEATURES",

        title:
            "Everything You Need To Crack Placements",

        description:
            "Ascendra combines Artificial Intelligence, NLP, Deep Learning and Computer Vision into one intelligent interview preparation platform.",

        aiMockInterviews: "AI Mock Interviews",
        aiMockInterviewsDesc:
            "Practice realistic interviews powered by AI.",

        atsResumeScanner: "ATS Resume Scanner",
        atsResumeScannerDesc:
            "Optimize your resume for recruiters.",

        codingAssessment: "Coding Assessment",
        codingAssessmentDesc:
            "Solve DSA and coding interview questions.",

        speechIntelligence: "Speech Intelligence",
        speechIntelligenceDesc:
            "Analyze confidence, pace and clarity.",

        computerVision: "Computer Vision",
        computerVisionDesc:
            "Eye contact and posture analysis.",

        learningRoadmaps: "Learning Roadmaps",
        learningRoadmapsDesc:
            "Personalized preparation plans.",

        learnMore: "Learn More"
    },

    technology: {

        label: "TECHNOLOGY",

        title: "Powered By Modern Technologies",

        description:
            "Built with a production-ready technology stack combining Artificial Intelligence, Deep Learning, NLP and scalable backend architecture.",

        frontend: "Frontend",
        backend: "Backend",
        database: "Database",
        artificialIntelligence: "Artificial Intelligence",
        aiModels: "AI Models",
        security: "Security"
    },

    about: {

        label: "ABOUT ASCENDRA",

        title:
            "Built For The Next Generation Of Placements",

        description:
            "Ascendra combines Artificial Intelligence, Deep Learning, Computer Vision, Natural Language Processing and Speech Intelligence to prepare students for real-world technical interviews.",

        aiDrivenEvaluation: "AI Driven Evaluation",

        aiDrivenEvaluationDescription:
            "Analyze speech, eye contact, facial expressions, coding ability and resume using intelligent AI models.",

        personalizedRoadmaps: "Personalized Roadmaps",

        personalizedRoadmapsDescription:
            "Every student receives a custom roadmap based on strengths, weaknesses and interview history.",

        securePlatform: "Secure Platform",

        securePlatformDescription:
            "JWT Authentication, PostgreSQL, encrypted passwords and secure APIs.",

        whyRecruitersLove:
            "Why Recruiters Love Ascendra",

        whyRecruitersLoveDescription:
            "Instead of generic interview practice, Ascendra creates a complete AI-powered placement readiness ecosystem combining resume optimization, coding interviews, speech intelligence and adaptive learning.",

        aiModules: "AI Modules",
        assessmentTypes: "Assessment Types",
        personalizedFeedback: "Personalized Feedback",
        predictionAccuracy: "Prediction Accuracy"
    }

},

login: {

    backHome: "Back to Home",

    title: "Welcome Back",

    description:
        "Login to continue your AI Interview Journey",

    email: "Email",

    password: "Password",

    forgotPassword:
        "Forgot Password?",

    login: "Login",

    noAccount:
        "Don't have an account?",

    register:
        "Register",

    loginSuccess:
        "Login Successful",

    invalidCredentials:
        "Invalid Credentials"
},

forgotPassword: {

    backToLogin:
        "Back to Login",

    forgotTitle:
        "Forgot Password?",

    forgotDescription:
        "Enter your registered email address. We'll send you a 6-digit OTP to reset your password.",

    emailPlaceholder:
        "Enter your email",

    sendOtp:
        "Send OTP",

    sending:
        "Sending...",

    verifyTitle:
        "Verify OTP",

    otpSent:
        "We've sent a 6-digit OTP to:",

    otpPlaceholder:
        "Enter 6-digit OTP",

    verifyOtp:
        "Verify OTP",

    verifying:
        "Verifying...",

    resendOtp:
        "Resend OTP",

    resendIn:
        "Resend OTP in",

    changeEmail:
        "Change Email",

    newPasswordTitle:
        "Create New Password",

    newPasswordDescription:
        "Your OTP has been verified. Create a new password for your account.",

    newPassword:
        "New password",

    confirmPassword:
        "Confirm new password",

    resetPassword:
        "Reset Password",

    resetting:
        "Resetting...",

    emailRequired:
        "Please enter your email address.",

    otpRequired:
        "Enter the 6-digit OTP.",

    passwordLength:
        "Password must be at least 8 characters.",

    passwordMismatch:
        "Passwords do not match.",

    otpSentSuccess:
        "If the email is registered, an OTP has been sent.",

    resendSuccess:
        "A new OTP has been sent to your email.",

    otpVerified:
        "OTP verified successfully.",

    passwordReset:
        "Password reset successfully!",

    unableToSend:
        "Unable to send OTP.",

    unableToResend:
        "Unable to resend OTP.",

    invalidOtp:
        "Invalid or expired OTP.",

    unableToReset:
        "Unable to reset password."
}

    },

    // =====================================================
    // HINDI
    // =====================================================

    "hi": {

        sidebar: {

            dashboard:
                "डैशबोर्ड",

            interview:
                "इंटरव्यू",

            groupDiscussion:
                "ग्रुप डिस्कशन",

            preparation:
                "प्रिपरेशन हब",

            resume:
                "रिज़्यूमे विश्लेषण",

            roadmap:
                "रोडमैप",

            profile:
                "प्रोफ़ाइल",

            settings:
                "सेटिंग्स",

            logout:
                "लॉग आउट"

        },

        settings: {

            title:
                "सेटिंग्स",

            subtitle:
                "अपनी Ascendra प्राथमिकताओं और अकाउंट सेटिंग्स को मैनेज करें।",

            appearance:
                "दिखावट",

            appearanceDescription:
                "चुनें कि Ascendra कैसा दिखाई दे।",

            light:
                "लाइट",

            dark:
                "डार्क",

            system:
                "सिस्टम",

            language:
                "भाषा",

            languageDescription:
                "Ascendra में उपयोग की जाने वाली भाषा चुनें।",

            changePassword:
                "पासवर्ड बदलें",

            changePasswordDescription:
                "अपने अकाउंट का पासवर्ड अपडेट करें।",

            notifications:
                "नोटिफिकेशन",

            notificationsDescription:
                "अपने Ascendra नोटिफिकेशन को मैनेज करें।",

            emailNotifications:
                "ईमेल नोटिफिकेशन",

            emailNotificationsDescription:
                "महत्वपूर्ण अपडेट ईमेल द्वारा प्राप्त करें।",

            preparationReminders:
                "प्रिपरेशन रिमाइंडर",

            preparationRemindersDescription:
                "अपनी तैयारी के बारे में रिमाइंडर प्राप्त करें।",

            interviewReminders:
                "इंटरव्यू और GD रिमाइंडर",

            interviewRemindersDescription:
                "आने वाले प्रैक्टिस सेशन के लिए रिमाइंडर प्राप्त करें।",

            preparationPreferences:
                "प्रिपरेशन प्राथमिकताएँ",

            preparationPreferencesDescription:
                "अपनी प्लेसमेंट तैयारी को कस्टमाइज़ करें।",

            dailyGoal:
                "दैनिक तैयारी का लक्ष्य",

            difficulty:
                "पसंदीदा कठिनाई स्तर",

            privacyData:
                "प्राइवेसी और डेटा",

            privacyDataDescription:
                "मैनेज करें कि आपका Ascendra डेटा कैसे उपयोग किया जाता है।",

            personalization:
                "पर्सनलाइज़ेशन",

            personalizationDescription:
                "Ascendra को आपकी गतिविधि और प्रदर्शन के आधार पर सुझावों को पर्सनलाइज़ करने की अनुमति दें।",

            exportData:
                "मेरा डेटा एक्सपोर्ट करें",

            logout:
                "लॉग आउट",

            logoutDescription:
                "अपने Ascendra अकाउंट से साइन आउट करें।"

        },

        dashboard: {

            welcome:
                "वापसी पर स्वागत है",

            greeting:
                "अपने अगले इंटरव्यू में सफलता पाने के लिए तैयार हैं?",

            level:
                "लेवल",

            currentStreak:
                "वर्तमान स्ट्रीक",

            days:
                "दिन",

            xp:
                "XP",

            interviews:
                "इंटरव्यू",

            readiness:
                "रेडिनेस",

            startAIInterview:
                "AI इंटरव्यू शुरू करें",

            startAIInterviewDescription:
                "AI के साथ अभ्यास करें और अपने इंटरव्यू कौशल को बेहतर बनाएं।",

            resumeAnalysis:
                "रिज़्यूमे विश्लेषण",

            resumeAnalysisDescription:
                "ATS स्कोर और AI द्वारा संचालित रिज़्यूमे सुझाव प्राप्त करें।",

            start:
                "शुरू करें",

            analyze:
                "विश्लेषण करें"

        },

        interview: {
            chooseMode: "इंटरव्यू मोड चुनें",
            selectPracticeMode:
                "चुनें कि आप आज किस तरह अभ्यास करना चाहते हैं।",

            aiMockInterview: "AI मॉक इंटरव्यू",
            aiMockInterviewDescription:
                "AI के साथ विषय-आधारित तकनीकी और HR इंटरव्यू का अभ्यास करें।",

            companyInterview: "कंपनी स्पेसिफिक इंटरव्यू",
            companyInterviewDescription:
                "वास्तविक कंपनी हायरिंग पैटर्न के आधार पर इंटरव्यू का अनुभव लें।",

            backToInterview: "इंटरव्यू पर वापस जाएँ",

            configureInterview:
                "शुरू करने से पहले अपना इंटरव्यू कॉन्फ़िगर करें।",

            subject: "विषय",
            selectSubject: "विषय चुनें",

            difficulty: "कठिनाई",
            easy: "आसान",
            medium: "मध्यम",
            hard: "कठिन",

            duration: "अवधि",
            durationMinutes: "इंटरव्यू अवधि",

            language: "भाषा",

            startInterview: "इंटरव्यू शुरू करें",
            startCompanyInterview:
                "कंपनी इंटरव्यू शुरू करें",

            company: "कंपनी",
            selectCompany: "कंपनी चुनें",

            jobRole: "जॉब रोल",
            selectRole: "रोल चुनें"
        },

        groupDiscussion: {

            title:
                "ग्रुप डिस्कशन",

            description:
                "ग्रुप डिस्कशन का अभ्यास करें और अपनी कम्युनिकेशन, कॉन्फिडेंस और टीमवर्क को बेहतर बनाएं।",

            backToInterview:
                "इंटरव्यू पर वापस जाएँ",

            selectMode:
                "डिस्कशन मोड चुनें",

            selectModeDescription:
                "चुनें कि आप किस तरह ग्रुप डिस्कशन का अभ्यास करना चाहते हैं।",

            aiDiscussion:
                "AI ग्रुप डिस्कशन",

            aiDiscussionDescription:
                "AI प्रतिभागियों के साथ अभ्यास करें और अपनी परफॉर्मेंस पर फीडबैक प्राप्त करें।",

            peerDiscussion:
                "पीयर ग्रुप डिस्कशन",

            peerDiscussionDescription:
                "अन्य उम्मीदवारों के साथ रियल-टाइम ग्रुप डिस्कशन का अभ्यास करें।",

            topic:
                "डिस्कशन टॉपिक",

            selectTopic:
                "टॉपिक चुनें",

            customTopic:
                "कस्टम टॉपिक",

            enterTopic:
                "अपना डिस्कशन टॉपिक दर्ज करें",

            difficulty:
                "कठिनाई",

            easy:
                "आसान",

            medium:
                "मध्यम",

            hard:
                "कठिन",

            duration:
                "अवधि",

            language:
                "भाषा",

            participants:
                "प्रतिभागी",

            invite:
                "प्रतिभागियों को आमंत्रित करें",

            roomCode:
                "रूम कोड",

            enterRoomCode:
                "रूम कोड दर्ज करें",

            joinRoom:
                "रूम जॉइन करें",

            copyInvite:
                "इनवाइट लिंक कॉपी करें",

            startDiscussion:
                "ग्रुप डिस्कशन शुरू करें",

            aiPreview:
                "AI प्रतिभागी प्रीव्यू",

            aiParticipants:
                "AI प्रतिभागी",

            communication:
                "कम्युनिकेशन",

            confidence:
                "कॉन्फिडेंस",

            teamwork:
                "टीमवर्क",

            relevance:
                "प्रासंगिकता"
        },

        resume: {

            title:
                "रिज़्यूमे इंटेलिजेंस",

            description:
                "अपना रिज़्यूमे अपलोड करें और AI आधारित ATS स्कोर, रिक्रूटर इनसाइट्स और इंटरव्यू तैयारी प्राप्त करें।",

            aiResumeAnalysis:
                "AI रिज़्यूमे विश्लेषण",

            uploadDescription:
                "अपना नवीनतम रिज़्यूमे अपलोड करें और अपनी पसंदीदा कंपनी और रोल के अनुसार विश्लेषण को कस्टमाइज़ करें।",

            dragDrop:
                "रिज़्यूमे ड्रैग और ड्रॉप करें",

            // Used by ResumeUpload
            dragAndDrop:
                "रिज़्यूमे ड्रैग और ड्रॉप करें",

            fileFormat:
                "PDF या DOCX • अधिकतम 5 MB",

            fileTypes:
                "PDF या DOCX",

            maxSize:
                "अधिकतम 5 MB",

            chooseResume:
                "रिज़्यूमे चुनें",

            targetCompany:
                "टारगेट कंपनी",

            selectTargetCompany:
                "टारगेट कंपनी चुनें",

            targetRole:
                "टारगेट रोल",

            selectTargetRole:
                "टारगेट रोल चुनें",

            experienceLevel:
                "अनुभव स्तर",

            fresher:
                "फ्रेशर",

            intern:
                "इंटर्न",

            zeroToTwo:
                "0-2 वर्ष",

            twoToFive:
                "2-5 वर्ष",

            // Used by ResumeUpload
            experience: {

                fresher:
                    "फ्रेशर",

                intern:
                    "इंटर्न",

                zeroToTwo:
                    "0-2 वर्ष",

                twoToFive:
                    "2-5 वर्ष"
            },

            resumeVersion:
                "रिज़्यूमे वर्ज़न",

            latestResume:
                "नवीनतम रिज़्यूमे",

            versionTwo:
                "वर्ज़न 2",

            versionOne:
                "वर्ज़न 1",

            // Used by ResumeUpload
            version: {

                latest:
                    "नवीनतम रिज़्यूमे",

                versionTwo:
                    "वर्ज़न 2",

                versionOne:
                    "वर्ज़न 1"
            },

            analyzeResume:
                "रिज़्यूमे का विश्लेषण करें",

            // Used by ResumeUpload
            analyzeButton:
                "रिज़्यूमे का विश्लेषण करें",

            readyForAnalysis:
                "AI विश्लेषण के लिए तैयार",

            analysisDescription:
                "अपना रिज़्यूमे अपलोड करें और Analyze Resume पर क्लिक करके प्राप्त करें:",

            atsScore:
                "ATS स्कोर",

            missingKeywords:
                "मिसिंग कीवर्ड्स",

            companyMatch:
                "कंपनी मैच",

            aiSuggestions:
                "AI सुझाव",

            resumeInterview:
                "रिज़्यूमे इंटरव्यू"
        },

        profile: {

            title:
                "प्रोफ़ाइल",

            completeProfile:
                "अपनी प्लेसमेंट रेडिनेस बेहतर करने के लिए अपनी प्रोफ़ाइल पूरी करें।",

            personalInformation:
                "व्यक्तिगत जानकारी",

            professionalProfiles:
                "प्रोफेशनल प्रोफ़ाइल",

            placementReadiness:
                "प्लेसमेंट रेडिनेस",

            readiness:
                "रेडिनेस",

            readinessDescription:
                "आपकी वर्तमान परफॉर्मेंस के आधार पर आपकी प्लेसमेंट रेडिनेस।",

            readinessBreakdown:
                "रेडिनेस ब्रेकडाउन",

            breakdownDescription:
                "देखें कि प्रत्येक क्षेत्र आपकी कुल प्लेसमेंट रेडिनेस में कितना योगदान देता है।",

            loadingBreakdown:
                "रेडिनेस ब्रेकडाउन लोड हो रहा है...",

            placementReady:
                "प्लेसमेंट के लिए तैयार",

            advanced:
                "एडवांस्ड",

            intermediate:
                "इंटरमीडिएट",

            developing:
                "डेवलपिंग",

            beginner:
                "बिगिनर",

            profile:
                "प्रोफ़ाइल",

            placementGoals:
                "प्लेसमेंट लक्ष्य",

            resume:
                "रिज़्यूमे",

            coding:
                "कोडिंग",

            interview:
                "इंटरव्यू",

            groupDiscussion:
                "ग्रुप डिस्कशन",

            roadmap:
                "रोडमैप",

            statistics:
                "आँकड़े",

            achievements:
                "उपलब्धियाँ",

            skills:
                "स्किल्स",

            insights:
                "इनसाइट्स",

            activity:
                "गतिविधि",

            edit:
                "एडिट",

            save:
                "सेव",

            cancel:
                "रद्द करें",

            add:
                "जोड़ें",

            name:
                "पूरा नाम",

            fullName:
                "पूरा नाम",

            email:
                "ईमेल",

            college:
                "कॉलेज",

            branch:
                "ब्रांच",

            graduationYear:
                "ग्रेजुएशन वर्ष",

            github:
                "GitHub",

            linkedin:
                "LinkedIn",

            portfolio:
                "पोर्टफोलियो",

            leetcode:
                "LeetCode",

            addSkill:
                "स्किल जोड़ें",

            currentStreak:
                "वर्तमान स्ट्रीक",

            interviews:
                "इंटरव्यू",

            xp:
                "XP",

            resumeScore:
                "रिज़्यूमे स्कोर",

            interviewScore:
                "इंटरव्यू स्कोर",

            gdScore:
                "GD स्कोर",

            professionalProfile:
                "प्रोफेशनल प्रोफ़ाइल",

            linkedinDescription:
                "अपना LinkedIn प्रोफ़ाइल जोड़ें",

            githubDescription:
                "अपना GitHub प्रोफ़ाइल जोड़ें",

            portfolioDescription:
                "अपनी पोर्टफोलियो वेबसाइट जोड़ें",

            leetcodeDescription:
                "अपना LeetCode प्रोफ़ाइल जोड़ें",

            enterProfileUrl:
                "प्रोफ़ाइल URL दर्ज करें:",

            updateProfileError:
                "प्रोफ़ाइल अपडेट करने में समस्या हुई।",

            updateGoalsError:
                "प्लेसमेंट लक्ष्य अपडेट करने में समस्या हुई।",

            dreamCompany:
                "ड्रीम कंपनी",

            targetRole:
                "टारगेट रोल",

            preferredDomain:
                "पसंदीदा डोमेन",

            notSelected:
                "चयनित नहीं है",

            resumeUploads:
                "रिज़्यूमे अपलोड",

            lastUpload:
                "अंतिम अपलोड",

            average:
                "औसत",

            gdSessions:
                "GD सेशन",

            rating:
                "रेटिंग",

            recentActivity:
                "हाल की गतिविधि",

            joinedAscendra:
                "Ascendra से जुड़े",

            noResume:
                "अभी कोई रिज़्यूमे अपलोड नहीं किया गया",

            noCoding:
                "अभी कोई कोडिंग प्रैक्टिस नहीं हुई",

            noInterviews:
                "अभी कोई इंटरव्यू पूरा नहीं किया गया",

            firstResume:
                "पहला रिज़्यूमे",

            firstInterview:
                "पहला इंटरव्यू",

            hundredCoding:
                "100 कोडिंग समस्याएँ",

            thirtyDayStreak:
                "30 दिन की स्ट्रीक",

            aiInsights:
                "AI इनसाइट्स",

            resumeAnalysis:
                "रिज़्यूमे विश्लेषण पूरा करें",

            codingPractice:
                "कोडिंग प्रैक्टिस पूरी करें",

            mockInterview:
                "मॉक इंटरव्यू पूरा करें",

            groupDiscussionInsight:
                "ग्रुप डिस्कशन पूरा करें",

            generateRoadmap:
                "अपना पर्सनलाइज़्ड रोडमैप बनाएं",

            emptyState:
                "अभी कोई डेटा उपलब्ध नहीं है। अपनी प्रोफ़ाइल बनाने के लिए अभ्यास शुरू करें।",

            noAchievements:
                "जैसे-जैसे आप आगे बढ़ेंगे, आपकी उपलब्धियाँ यहाँ दिखाई देंगी।",

            noInsights:
                "पर्सनलाइज़्ड इनसाइट्स प्राप्त करने के लिए और गतिविधियाँ पूरी करें।",

            noActivity:
                "आपकी हाल की गतिविधियाँ यहाँ दिखाई देंगी।"

        },

        roadmap: {

            title:
                "AI करियर रोडमैप",

            description:
                "अपने ड्रीम रोल, कंपनी और वर्तमान स्किल लेवल के आधार पर AI की मदद से एक पर्सनलाइज़्ड प्लेसमेंट रोडमैप बनाएं।",

            googleSDE:
                "Google SDE",

            aiEngineer:
                "AI इंजीनियर",

            dataScientist:
                "डेटा साइंटिस्ट",

            fullStackDeveloper:
                "फुल स्टैक डेवलपर",

            mlEngineer:
                "ML इंजीनियर",

            goalLabel:
                "आपका लक्ष्य क्या है?",

            goalPlaceholder:
                "उदाहरण: मैं 8 महीनों के भीतर NVIDIA में AI इंजीनियर बनना चाहता हूँ।",

            generateRoadmap:
                "रोडमैप बनाएं",

            roadmapWillAppear:
                "रोडमैप यहाँ दिखाई देगा।",

            personalizedRoadmaps:
                "AI पर्सनलाइज़्ड रोडमैप",

            personalizedRoadmapsDescription:
                "Ascendra AI आपकी प्रगति के आधार पर साप्ताहिक लर्निंग प्लान, कोडिंग शेड्यूल, इंटरव्यू तैयारी, रिज़्यूमे माइलस्टोन और पर्सनलाइज़्ड सुझाव तैयार करेगा।"

        },

        landing: {

    nav: {
        home: "Home",
        features: "Features",
        technology: "Technology",
        about: "About",
        login: "Login",
        getStarted: "Get Started"
    },

    hero: {
        badge: "Multimodal AI Interview Intelligence Platform",

        titleLine1: "Prepare Smarter.",
        titleLine2: "Perform Better.",

        description:
            "Ascendra is an AI-powered placement readiness platform that combines NLP, Deep Learning, Computer Vision, and Speech Intelligence to simulate real interviews, assess technical and communication skills, and generate personalized feedback with adaptive learning roadmaps.",

        getStarted: "Get Started",
        watchDemo: "Watch Demo",

        aiModules: "AI Modules",
        assessmentTypes: "Assessment Types",
        personalizedFeedback: "Personalized Feedback"
    },

    features: {

        label: "FEATURES",

        title:
            "Everything You Need To Crack Placements",

        description:
            "Ascendra combines Artificial Intelligence, NLP, Deep Learning and Computer Vision into one intelligent interview preparation platform.",

        aiMockInterviews: "AI Mock Interviews",
        aiMockInterviewsDesc:
            "Practice realistic interviews powered by AI.",

        atsResumeScanner: "ATS Resume Scanner",
        atsResumeScannerDesc:
            "Optimize your resume for recruiters.",

        codingAssessment: "Coding Assessment",
        codingAssessmentDesc:
            "Solve DSA and coding interview questions.",

        speechIntelligence: "Speech Intelligence",
        speechIntelligenceDesc:
            "Analyze confidence, pace and clarity.",

        computerVision: "Computer Vision",
        computerVisionDesc:
            "Eye contact and posture analysis.",

        learningRoadmaps: "Learning Roadmaps",
        learningRoadmapsDesc:
            "Personalized preparation plans.",

        learnMore: "Learn More"
    },

    technology: {

        label: "TECHNOLOGY",

        title: "Powered By Modern Technologies",

        description:
            "Built with a production-ready technology stack combining Artificial Intelligence, Deep Learning, NLP and scalable backend architecture.",

        frontend: "Frontend",
        backend: "Backend",
        database: "Database",
        artificialIntelligence: "Artificial Intelligence",
        aiModels: "AI Models",
        security: "Security"
    },

    about: {

        label: "ABOUT ASCENDRA",

        title:
            "Built For The Next Generation Of Placements",

        description:
            "Ascendra combines Artificial Intelligence, Deep Learning, Computer Vision, Natural Language Processing and Speech Intelligence to prepare students for real-world technical interviews.",

        aiDrivenEvaluation: "AI Driven Evaluation",

        aiDrivenEvaluationDescription:
            "Analyze speech, eye contact, facial expressions, coding ability and resume using intelligent AI models.",

        personalizedRoadmaps: "Personalized Roadmaps",

        personalizedRoadmapsDescription:
            "Every student receives a custom roadmap based on strengths, weaknesses and interview history.",

        securePlatform: "Secure Platform",

        securePlatformDescription:
            "JWT Authentication, PostgreSQL, encrypted passwords and secure APIs.",

        whyRecruitersLove:
            "Why Recruiters Love Ascendra",

        whyRecruitersLoveDescription:
            "Instead of generic interview practice, Ascendra creates a complete AI-powered placement readiness ecosystem combining resume optimization, coding interviews, speech intelligence and adaptive learning.",

        aiModules: "AI Modules",
        assessmentTypes: "Assessment Types",
        personalizedFeedback: "Personalized Feedback",
        predictionAccuracy: "Prediction Accuracy"
    }

},

login: {

    backHome: "Back to Home",

    title: "Welcome Back",

    description:
        "Login to continue your AI Interview Journey",

    email: "Email",

    password: "Password",

    forgotPassword:
        "Forgot Password?",

    login: "Login",

    noAccount:
        "Don't have an account?",

    register:
        "Register",

    loginSuccess:
        "Login Successful",

    invalidCredentials:
        "Invalid Credentials"
},

forgotPassword: {

    backToLogin:
        "Back to Login",

    forgotTitle:
        "Forgot Password?",

    forgotDescription:
        "Enter your registered email address. We'll send you a 6-digit OTP to reset your password.",

    emailPlaceholder:
        "Enter your email",

    sendOtp:
        "Send OTP",

    sending:
        "Sending...",

    verifyTitle:
        "Verify OTP",

    otpSent:
        "We've sent a 6-digit OTP to:",

    otpPlaceholder:
        "Enter 6-digit OTP",

    verifyOtp:
        "Verify OTP",

    verifying:
        "Verifying...",

    resendOtp:
        "Resend OTP",

    resendIn:
        "Resend OTP in",

    changeEmail:
        "Change Email",

    newPasswordTitle:
        "Create New Password",

    newPasswordDescription:
        "Your OTP has been verified. Create a new password for your account.",

    newPassword:
        "New password",

    confirmPassword:
        "Confirm new password",

    resetPassword:
        "Reset Password",

    resetting:
        "Resetting...",

    emailRequired:
        "Please enter your email address.",

    otpRequired:
        "Enter the 6-digit OTP.",

    passwordLength:
        "Password must be at least 8 characters.",

    passwordMismatch:
        "Passwords do not match.",

    otpSentSuccess:
        "If the email is registered, an OTP has been sent.",

    resendSuccess:
        "A new OTP has been sent to your email.",

    otpVerified:
        "OTP verified successfully.",

    passwordReset:
        "Password reset successfully!",

    unableToSend:
        "Unable to send OTP.",

    unableToResend:
        "Unable to resend OTP.",

    invalidOtp:
        "Invalid or expired OTP.",

    unableToReset:
        "Unable to reset password."
}

    }

};

// =========================================================
// LANGUAGE PROVIDER
// =========================================================

export const LanguageProvider = ({ children }) => {

    const [language, setLanguage] = useState(() => {

        return (
            localStorage.getItem("language")
            || DEFAULT_LANGUAGE
        );

    });

    // =====================================================
    // LANGUAGE PERSISTENCE
    // =====================================================

    useEffect(() => {

        localStorage.setItem(
            "language",
            language
        );

        document.documentElement.lang =
            language;

        // Urdu = RTL
        document.documentElement.dir =
            language === "ur"
                ? "rtl"
                : "ltr";

    }, [language]);

    // =====================================================
    // CHANGE LANGUAGE
    // =====================================================

    const changeLanguage = (newLanguage) => {

        setLanguage(newLanguage);

    };

    // =====================================================
    // TRANSLATION FUNCTION
    // =====================================================

    const t = (key) => {

        const keys =
            key.split(".");

        let value =
            translations[language];

        // -------------------------------------------------
        // If selected language does not exist,
        // fallback to English
        // -------------------------------------------------

        if (!value) {

            value =
                translations[DEFAULT_LANGUAGE];

        }

        // -------------------------------------------------
        // Find requested translation
        // -------------------------------------------------

        for (const part of keys) {

            value =
                value?.[part];

        }

        // -------------------------------------------------
        // If translation doesn't exist in selected
        // language, fallback to English
        // -------------------------------------------------

        if (value === undefined) {

            value =
                translations[DEFAULT_LANGUAGE];

            for (const part of keys) {

                value =
                    value?.[part];

            }

        }

        // -------------------------------------------------
        // If translation doesn't exist anywhere,
        // return the key itself
        // -------------------------------------------------

        return value || key;

    };

    return (

        <LanguageContext.Provider
            value={{
                language,
                changeLanguage,
                t
            }}
        >

            {children}

        </LanguageContext.Provider>

    );

};

// =========================================================
// USE LANGUAGE HOOK
// =========================================================

export const useLanguage = () => {

    const context =
        useContext(LanguageContext);

    if (!context) {

        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        );

    }

    return context;

};