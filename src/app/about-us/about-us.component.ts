import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="about-container">
      <h1>About Us</h1>
      <div class="about-content">
        <section class="about-section">
          <h2>Our Story</h2>
          <p>
            Welcome to LouMuhsineen, where we are dedicated to serving our community with excellence and compassion. 
            Our journey began with a simple vision: to create a platform that connects and empowers individuals 
            through shared values and meaningful experiences.
          </p>
        </section>
        
        <section class="mission-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to foster a strong, supportive community where members can grow, learn, and thrive together. 
            We are committed to providing valuable resources, organizing meaningful events, and creating opportunities 
            for personal and collective development.
          </p>
        </section>
        
        <section class="values-section">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Community:</strong> Building strong, supportive relationships</li>
            <li><strong>Integrity:</strong> Upholding the highest ethical standards</li>
            <li><strong>Excellence:</strong> Striving for the best in all we do</li>
            <li><strong>Inclusivity:</strong> Welcoming everyone with open arms</li>
            <li><strong>Service:</strong> Giving back to our community</li>
          </ul>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      min-height: calc(100vh - 200px); /* Adjust based on your header/footer */
    }
    
    h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .about-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .about-section, .mission-section, .values-section {
      background-color: #fff;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      color: #4a6cf7;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    
    p {
      line-height: 1.6;
      color: #555;
      margin-bottom: 1rem;
    }
    
    ul {
      list-style-type: none;
      padding: 0;
    }
    
    li {
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
      position: relative;
      line-height: 1.6;
    }
    
    li:before {
      content: '•';
      color: #4a6cf7;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
    
    @media (max-width: 768px) {
      .about-container {
        padding: 1rem;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .about-section, .mission-section, .values-section {
        padding: 1rem;
      }
    }
  `]
})
export class AboutUsComponent { }
