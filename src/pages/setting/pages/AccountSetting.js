import React from 'react';

const AccountSetting = () => {
    return (
        <div>
            <h1>My Account</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />

                <label htmlFor="language">Language:</label>
                <select id="language" name="language">
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                </select>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default AccountSetting;