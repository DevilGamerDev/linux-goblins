import React from "react";
import { NavBar } from '../../components';
import "./index.css";

export function SupportPage(props) {

    return(
        <html>
            <NavBar />
            <body>
                <div className="main">
                    <div className="support-container">
                        <h1>Support & FAQs</h1>
                        <section className="faq-section">
                            <div className="faq-question">How to start building a PC?</div>  
                            <div className="faq-answer">Start by selecting your budget, purpose, and preferred components...</div>
                            <div className="faq-question">Where can I find build guides?</div>
                            <div className="faq-answer">Build guides are available in our Build a PC section...</div>
                        </section>
                        <section className="contact-form">
                            <h1 className="contact">Contact Us</h1>
                            <input type="text" className="form-field" placeholder="Your Name" />
                            <input type="email" className="form-field" placeholder="Your Email" />
                            <textarea className="form-field" placeholder="Your Message"></textarea>
                            <button className="submit-button">Send Message</button>
                        </section>
                    </div>           
                </div>
            </body>
        </html>
    )
}
