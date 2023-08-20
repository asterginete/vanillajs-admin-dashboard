# Admin Dashboard

This admin dashboard provides CRUD functionality for user profiles. It allows you to list, sort, add, delete, and update user profiles. The dashboard is built using VanillaJS, jQuery, and basic CSS.

## Features

- **List User Profiles**: Displays a table of user profiles with details like name, age, position, birthday, address, location, and contact number.
- **Sort User Profiles**: Click on any column header to sort the table based on that column.
- **Search and Filter**: Use the search bar to filter user profiles based on any column.
- **Add User**: Click on the "Add User" button to open a modal where you can input user details and add them to the list.
- **Edit User**: Click on the "Edit" button next to any user profile to open a modal where you can update their details.
- **Delete User**: Click on the "Delete" button next to any user profile to remove them from the list.
- **Pagination**: Navigate between pages of user profiles using the pagination controls.

## Setup and Usage

1. **Open in Browser**: Simply open the `index.html` file in your preferred web browser.

2. **API Endpoint**: The dashboard expects an API endpoint for fetching and updating user profiles. Update the `API_URL` constant in `script.js` to point to your API.

## File Structure

- `index.html`: Contains the main structure of the dashboard.
- `styles.css`: Contains all the styles for the dashboard.
- `script.js`: Contains the JavaScript logic for CRUD operations, sorting, filtering, and pagination.

## Customization

- **Styling**: Modify `styles.css` to change the look and feel of the dashboard.
- **Functionality**: Update `script.js` to add new features or modify existing ones.

## Dependencies

- [jQuery 3.6.0](https://code.jquery.com/jquery-3.6.0.min.js): Used for DOM manipulation and AJAX requests.

## Contributing

Feel free to fork this repository, make changes, and submit pull requests. Any feedback or suggestions are welcome!
