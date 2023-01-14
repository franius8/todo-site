// Function for getting the priority display color
export const priorityGetter = (priority: string) => {
    switch (priority) {
        case 'High':
            return 'red';
        case 'Standard':
            return 'orange';
        case 'Low':
            return 'green';
        case 'Normal':
            return 'skyblue';
        case 'Urgent':
            return 'crimson';
        default:
            return 'gray';
    }
}