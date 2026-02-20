class Task {
    constructor(description) {
        this.id = crypto.randomUUID();
        this.description = description;
        this.done = false;
    }

    toggleStatus() {
        this.done = !this.done;
    }
}