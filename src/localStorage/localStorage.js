export const loadState = () => {
    try{ 
        const serializedState = localStorage.getItem('paperAttempt');
        if (serializedState == null) return undefined;
        return JSON.parse(serializedState);
    } catch(e) {
        return undefined;
    }
}

export const saveState = (state) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('paperAttempt', serializedState);
    } catch(e) {
        console.log('paperAttempt was not saved. Please check the browser permissions');
    }
}

export const deleteState = () => {
    try {
        localStorage.removeItem('paperAttempt');
    } catch (e) {
        console.error('Unable to delete paperAttempt. This may cause problems with your future paper attempts.');
        console.log(e);
    }
}