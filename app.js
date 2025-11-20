document.addEventListener('DOMContentLoaded', () => {
  // Theme Handling
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');

  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // Routing and Content Loading
  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  const essaySlug = searchParams.get('slug');

  if (path.endsWith('essay.html') || essaySlug) {
    loadEssay(essaySlug);
  } else {
    loadEssayList();
  }
});

async function loadEssayList() {
  const listElement = document.getElementById('essayList');
  if (!listElement) return;

  try {
    const response = await fetch('essays.json');
    const essays = await response.json();

    // Sort essays: pinned first, then by date (newest first)
    essays.sort((a, b) => {
      // Pinned posts always come first
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      // Within same pinned status, sort by date (newest first)
      return new Date(b.date) - new Date(a.date);
    });

    listElement.innerHTML = '';

    essays.forEach(essay => {
      const li = document.createElement('li');
      li.className = 'essay-item';

      // Note: homepage no longer shows dates; date formatting kept for potential future use
      const date = new Date(essay.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      // Add pin icon for pinned posts (after title)
      const pinIcon = essay.pinned ? ' <span class="pin-icon">📌</span>' : '';

      // Check if this is an external link
      if (essay.externalUrl) {
        li.innerHTML = `
          <a href="${essay.externalUrl}" target="_blank" rel="noopener noreferrer">${essay.title}${pinIcon} <span class="external-link-icon">↗</span></a>
        `;
      } else {
        li.innerHTML = `
          <a href="essay.html?slug=${essay.slug}">${essay.title}${pinIcon}</a>
        `;
      }
      listElement.appendChild(li);
    });
  } catch (error) {
    console.error('Error loading essays:', error);
    listElement.innerHTML = '<li class="loading">Failed to load essays. Please try again later.</li>';
  }
}

async function loadEssay(slug) {
  const contentElement = document.getElementById('essayContent');
  if (!contentElement) return;

  if (!slug) {
    contentElement.innerHTML = '<div class="loading">Essay not found.</div>';
    return;
  }

  try {
    // Get essay metadata first
    const response = await fetch('essays.json');
    const essays = await response.json();
    const essay = essays.find(e => e.slug === slug);

    if (!essay) {
      throw new Error('Essay not found');
    }

    // Update page title
    document.title = `${essay.title} - Sudhir`;

    // Fetch markdown content
    const mdResponse = await fetch(essay.file);
    const mdText = await mdResponse.text();

    // Remove frontmatter (simple regex)
    const contentWithoutFrontmatter = mdText.replace(/^---[\s\S]*?---/, '');

    // Render markdown
    contentElement.innerHTML = `
      <div class="essay-header">
        <h1 class="essay-title">${essay.title}</h1>
        <div class="essay-date">${new Date(essay.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
      <div class="essay-body">
        ${marked.parse(contentWithoutFrontmatter)}
      </div>
    `;

    // Post-process images for resizing and positioning
    const images = contentElement.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src && src.includes('#')) {
        const hashPart = src.split('#')[1];

        // Parse width (e.g., #w50 or #w50-h300)
        const widthMatch = hashPart.match(/w(\d+)/);
        if (widthMatch) {
          const width = widthMatch[1];
          img.style.width = `${width}%`;
        }

        // Parse height (e.g., #h300 or #w50-h300)
        const heightMatch = hashPart.match(/h(\d+)/);
        if (heightMatch) {
          const height = heightMatch[1];
          img.style.height = `${height}px`;
        }

        // Parse float positioning (e.g., #left, #right, #w50-left)
        if (hashPart.includes('left')) {
          img.classList.add('img-float-left');
        } else if (hashPart.includes('right')) {
          img.classList.add('img-float-right');
        }
      }
    });
  } catch (error) {
    console.error('Error loading essay:', error);
    contentElement.innerHTML = '<div class="loading">Failed to load essay content.</div>';
  }
}
