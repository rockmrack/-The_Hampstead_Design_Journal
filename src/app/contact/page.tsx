import React from 'react';

const ContactPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="mb-4">
                We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us.
            </p>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input type="text" id="name" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input type="email" id="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium">Message</label>
                    <textarea id="message" name="message" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows="4"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Send Message</button>
            </form>
            <p className="mt-4">You can also reach us at <a href="mailto:info@hampsteaddesignjournal.com" className="text-blue-500">info@hampsteaddesignjournal.com</a></p>
        </div>
    );
};

export default ContactPage;