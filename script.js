// ==================== Utility Functions ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Login Page ====================
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simulate login
        if (email && password) {
            showNotification('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        } else {
            showNotification('Please fill in all fields', 'error');
        }
    });
}

// ==================== Signup Page ====================
if (document.getElementById('signupForm')) {
    const signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        if (fullname && email && password) {
            showNotification('Account created successfully! Redirecting...');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        } else {
            showNotification('Please fill in all fields', 'error');
        }
    });
}

// ==================== Profile Page ====================
if (document.getElementById('profileName')) {
    // Edit About Section
    const editAboutBtn = document.getElementById('editAboutBtn');
    const aboutText = document.getElementById('aboutText');
    const aboutForm = document.getElementById('aboutForm');
    const aboutInput = document.getElementById('aboutInput');
    const cancelAboutBtn = document.getElementById('cancelAboutBtn');
    
    if (editAboutBtn) {
        editAboutBtn.addEventListener('click', () => {
            aboutText.style.display = 'none';
            aboutForm.style.display = 'block';
            aboutInput.value = aboutText.textContent;
        });
        
        cancelAboutBtn.addEventListener('click', () => {
            aboutText.style.display = 'block';
            aboutForm.style.display = 'none';
        });
        
        aboutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            aboutText.textContent = aboutInput.value;
            aboutText.style.display = 'block';
            aboutForm.style.display = 'none';
            showNotification('About section updated!');
        });
    }
    
    // Add Teach Skill
    const addTeachSkillBtn = document.getElementById('addTeachSkillBtn');
    const addTeachSkillForm = document.getElementById('addTeachSkillForm');
    const teachSkillsList = document.getElementById('teachSkillsList');
    const cancelTeachSkillBtn = document.getElementById('cancelTeachSkillBtn');
    
    if (addTeachSkillBtn) {
        addTeachSkillBtn.addEventListener('click', () => {
            addTeachSkillForm.style.display = addTeachSkillForm.style.display === 'none' ? 'flex' : 'none';
        });
        
        cancelTeachSkillBtn.addEventListener('click', () => {
            addTeachSkillForm.style.display = 'none';
        });
        
        addTeachSkillForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const skillName = document.getElementById('teachSkillName').value;
            const skillLevel = document.getElementById('teachSkillLevel').value;
            
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <span class="skill-name">${skillName}</span>
                <span class="skill-level">${skillLevel}</span>
                <button class="btn-remove">✕</button>
            `;
            
            skillItem.querySelector('.btn-remove').addEventListener('click', () => {
                skillItem.remove();
                showNotification('Skill removed');
            });
            
            teachSkillsList.appendChild(skillItem);
            addTeachSkillForm.style.display = 'none';
            addTeachSkillForm.reset();
            showNotification('Skill added!');
        });
    }
    
    // Add Learn Skill
    const addLearnSkillBtn = document.getElementById('addLearnSkillBtn');
    const addLearnSkillForm = document.getElementById('addLearnSkillForm');
    const learnSkillsList = document.getElementById('learnSkillsList');
    const cancelLearnSkillBtn = document.getElementById('cancelLearnSkillBtn');
    
    if (addLearnSkillBtn) {
        addLearnSkillBtn.addEventListener('click', () => {
            addLearnSkillForm.style.display = addLearnSkillForm.style.display === 'none' ? 'flex' : 'none';
        });
        
        cancelLearnSkillBtn.addEventListener('click', () => {
            addLearnSkillForm.style.display = 'none';
        });
        
        addLearnSkillForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const skillName = document.getElementById('learnSkillName').value;
            const skillInterest = document.getElementById('learnSkillInterest').value;
            
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <span class="skill-name">${skillName}</span>
                <span class="skill-interest">${skillInterest}</span>
                <button class="btn-remove">✕</button>
            `;
            
            skillItem.querySelector('.btn-remove').addEventListener('click', () => {
                skillItem.remove();
                showNotification('Skill removed');
            });
            
            learnSkillsList.appendChild(skillItem);
            addLearnSkillForm.style.display = 'none';
            addLearnSkillForm.reset();
            showNotification('Skill added!');
        });
    }
    
    // Remove skill buttons
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.skill-item').remove();
            showNotification('Skill removed');
        });
    });
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Logged out successfully');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
}

// ==================== Matchmaking Page ====================
if (document.querySelector('.matchmaking-section')) {
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchSkill = document.getElementById('searchSkill');
    const matchType = document.getElementById('matchType');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const skill = searchSkill.value.toLowerCase();
            const type = matchType.value;
            
            const matchCards = document.querySelectorAll('.match-card');
            let visibleCount = 0;
            
            matchCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                const isPerfectMatch = card.classList.contains('perfect-match');
                
                let showCard = true;
                
                // Filter by skill
                if (skill && !cardText.includes(skill)) {
                    showCard = false;
                }
                
                // Filter by match type
                if (type === 'perfect' && !isPerfectMatch) {
                    showCard = false;
                } else if (type === 'partial' && isPerfectMatch) {
                    showCard = false;
                }
                
                card.style.display = showCard ? 'block' : 'none';
                if (showCard) visibleCount++;
            });
            
            if (visibleCount === 0) {
                showNotification('No matches found. Try different filters.', 'error');
            } else {
                showNotification(`Found ${visibleCount} match${visibleCount > 1 ? 'es' : ''}!`);
            }
        });
    }
    
    // Connect buttons
    document.querySelectorAll('.btn-connect').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const matchCard = e.target.closest('.match-card');
            const userName = matchCard.querySelector('h3').textContent;
            showNotification(`Connection request sent to ${userName}!`);
            
            // Change button state
            e.target.textContent = 'Request Sent';
            e.target.disabled = true;
            e.target.style.opacity = '0.6';
            e.target.style.cursor = 'not-allowed';
        });
    });
}

// ==================== Messages Page ====================
if (document.querySelector('.messages-section')) {
    // Switch conversations
    const conversationItems = document.querySelectorAll('.conversation-item');
    const chatMessages = document.getElementById('chatMessages');
    
    conversationItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            conversationItems.forEach(i => i.classList.remove('active'));
            // Add active to clicked
            item.classList.add('active');
            
            // Remove unread badge
            const badge = item.querySelector('.unread-badge');
            if (badge) badge.remove();
            
            // Update chat header
            const userName = item.dataset.user;
            document.querySelector('.chat-user-info h3').textContent = userName;
            
            showNotification(`Switched to conversation with ${userName}`);
        });
    });
    
    // Send message
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const messageInput = document.getElementById('messageInput');
    
    if (sendMessageBtn && messageInput) {
        const sendMessage = () => {
            const messageText = messageInput.value.trim();
            
            if (messageText) {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message sent';
                messageDiv.innerHTML = `
                    <div class="message-content">
                        <p>${messageText}</p>
                        <span class="message-time">Just now</span>
                    </div>
                `;
                
                chatMessages.appendChild(messageDiv);
                messageInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate reply after 2 seconds
                setTimeout(() => {
                    const replyDiv = document.createElement('div');
                    replyDiv.className = 'message received';
                    replyDiv.innerHTML = `
                        <div class="message-avatar">A</div>
                        <div class="message-content">
                            <p>Thanks for your message! I'll get back to you soon.</p>
                            <span class="message-time">Just now</span>
                        </div>
                    `;
                    chatMessages.appendChild(replyDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 2000);
            }
        };
        
        sendMessageBtn.addEventListener('click', sendMessage);
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // Search conversations
    const searchConversations = document.getElementById('searchConversations');
    if (searchConversations) {
        searchConversations.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            conversationItems.forEach(item => {
                const userName = item.querySelector('h4').textContent.toLowerCase();
                const preview = item.querySelector('.conversation-preview').textContent.toLowerCase();
                
                if (userName.includes(searchTerm) || preview.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Mobile Navigation Toggle ====================
// Add mobile menu toggle if needed for smaller screens
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && window.innerWidth <= 768) {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '☰';
        menuBtn.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-primary);
        `;
        
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        const navContent = document.querySelector('.nav-content');
        if (navContent && !document.querySelector('.mobile-menu-btn')) {
            navContent.appendChild(menuBtn);
        }
    }
};

// Initialize on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// ==================== Animation on Scroll ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.step, .feature, .match-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

console.log('Skillloop initialized successfully! 🚀');
