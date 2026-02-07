// Dynamic Blog Creation and Management

document.addEventListener('DOMContentLoaded', function() {
    // Load existing blogs from localStorage
    loadBlogs();

    // Handle blog form submission
    const blogForm = document.querySelector('.blog-form');
    if (blogForm) {
        blogForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createBlog();
        });
    }

    // Handle search functionality
    const searchForm = document.querySelector('.nav-right form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = document.querySelector('.form-input').value.toLowerCase();
            searchBlogs(query);
        });
    }

    // Handle category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Modal functionality
    const createBlogBtn = document.getElementById('create-blog-btn');
    const modal = document.getElementById('blog-modal');
    const closeModal = document.querySelector('.close');

    if (createBlogBtn && modal) {
        createBlogBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Add animations
    addAnimations();
});

function createBlog() {
    const title = document.getElementById('blog-title').value;
    const author = document.getElementById('blog-author').value;
    const content = document.getElementById('blog-content').value;
    const imageFile = document.getElementById('blog-image').files[0];

    if (!title || !author || !content) {
        alert('Please fill in all required fields.');
        return;
    }

    const blog = {
        id: Date.now(),
        title,
        author,
        content,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        date: new Date().toLocaleDateString(),
        readTime: Math.ceil(content.split(' ').length / 200) + ' min read'
    };

    // Save to localStorage
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.unshift(blog); // Add to beginning
    localStorage.setItem('blogs', JSON.stringify(blogs));

    // Reset form
    document.querySelector('.blog-form').reset();

    // Close modal if open
    const modal = document.getElementById('blog-modal');
    if (modal) modal.style.display = 'none';

    // Reload blogs
    loadBlogs();

    alert('Blog created successfully!');
}

function loadBlogs() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogContainer = document.querySelector('.user-blogs');
    if (!blogContainer) return;

    blogContainer.innerHTML = '';

    blogs.forEach(blog => {
        const blogElement = createBlogElement(blog);
        blogContainer.appendChild(blogElement);
    });
}

function createBlogElement(blog) {
    const div = document.createElement('div');
    div.className = 'home-article fade-in';
    div.innerHTML = `
        <div class="home-article-img">
            <img src="${blog.image || 'img/1.png'}" alt="blog image">
        </div>
        <div class="home-article-content font1">
            <a href="#" onclick="viewBlog(${blog.id})">
                <h3>${blog.title}</h3>
            </a>
            <div>${blog.author}</div>
            <span>${blog.date} | ${blog.readTime}</span>
        </div>
    `;
    return div;
}

function viewBlog(id) {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs.find(b => b.id === id);
    if (blog) {
        // For now, just alert. In a real app, this would open a detailed view
        alert(`Title: ${blog.title}\nAuthor: ${blog.author}\nContent: ${blog.content.substring(0, 100)}...`);
    }
}

function searchBlogs(query) {
    const articles = document.querySelectorAll('.home-article');
    articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const author = article.querySelector('div').textContent.toLowerCase();
        if (title.includes(query) || author.includes(query)) {
            article.style.display = 'flex';
        } else {
            article.style.display = 'none';
        }
    });
}

function addAnimations() {
    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Add hover effects
    document.querySelectorAll('.home-article').forEach(article => {
        article.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        article.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}
