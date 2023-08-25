$(document).ready(function() {
    const API_URL = 'https://your-api-endpoint.com/users';
    let currentPage = 1;
    const itemsPerPage = 10;
    let currentSortColumn = '';
    let currentSortOrder = 'asc';

    function fetchUsers(page = 1, sortColumn = '', sortOrder = 'asc', filter = '') {
        const url = `${API_URL}?page=${page}&sort=${sortColumn}&order=${sortOrder}&filter=${filter}`;
        $.get(url, function(data) {
            renderTable(data.users);
            currentPage = data.currentPage;
            $('#currentPage').text(currentPage);
        });
    }

    function renderTable(users) {
        let rows = '';
        users.forEach(user => {
            rows += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.age}</td>
                    <td>${user.position}</td>
                    <td>${user.birthday}</td>
                    <td>${user.address}</td>
                    <td>${user.location}</td>
                    <td>${user.contactNumber}</td>
                    <td>
                        <button class="edit" data-id="${user.id}">Edit</button>
                        <button class="delete" data-id="${user.id}">Delete</button>
                    </td>
                </tr>
            `;
        });
        $('#userTable tbody').html(rows);
    }

    // Add user modal logic
    const modal = $('#userModal');
    const closeModal = () => modal.hide();
    $('.close').click(closeModal);
    $('#addUser').click(() => {
        $('#userId').val(''); // Clear user ID for new entries
        modal.show();
    });
    $('#userForm').submit(function(e) {
        e.preventDefault();
        const userData = {
            name: $('#name').val(),
            age: $('#age').val(),
            position: $('#position').val(),
            birthday: $('#birthday').val(),
            address: $('#address').val(),
            location: $('#location').val(),
            contactNumber: $('#contactNumber').val()
        };
        const userId = $('#userId').val();
        if (userId) { // If user ID exists, it's an edit operation
            $.ajax({
                url: API_URL + '/' + userId,
                type: 'PUT',
                data: userData,
                success: function() {
                    closeModal();
                    fetchUsers(currentPage);
                }
            });
        } else { // Else, it's an add operation
            $.post(API_URL, userData, function() {
                closeModal();
                fetchUsers(currentPage);
            });
        }
    });

    // Edit user logic
    $('#userTable').on('click', '.edit', function() {
        const userId = $(this).data('id');
        $.get(API_URL + '/' + userId, function(user) {
            $('#userId').val(user.id);
            $('#name').val(user.name);
            $('#age').val(user.age);
            $('#position').val(user.position);
            $('#birthday').val(user.birthday);
            $('#address').val(user.address);
            $('#location').val(user.location);
            $('#contactNumber').val(user.contactNumber);
            modal.show();
        });
    });

    // Delete user logic
    $('#userTable').on('click', '.delete', function() {
        const userId = $(this).data('id');
        $.ajax({
            url: API_URL + '/' + userId,
            type: 'DELETE',
            success: function() {
                fetchUsers(currentPage);
            }
        });
    });

    // Pagination logic
    $('#prevPage').click(() => {
        if (currentPage > 1) {
            fetchUsers(currentPage - 1, currentSortColumn, currentSortOrder);
        }
    });
    $('#nextPage').click(() => {
        fetchUsers(currentPage + 1, currentSortColumn, currentSortOrder);
    });

    // Sorting and filtering
    $('#userTable th[data-sort]').click(function() {
        currentSortColumn = $(this).data('sort');
        currentSortOrder = (currentSortOrder === 'asc') ? 'desc' : 'asc';
        fetchUsers(currentPage, currentSortColumn, currentSortOrder);
    });
    $('#search').on('input', function() {
        const filter = $(this).val();
        fetchUsers(currentPage, currentSortColumn, currentSortOrder, filter);
    });

    fetchUsers();
});
