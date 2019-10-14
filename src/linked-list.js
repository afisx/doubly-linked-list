const Node = require('./node');

class LinkedList {
    constructor() {
		this._head = new Node();
		this._tail = this._head
		this.length = 0;
	}

    append(data) {
		if(!this._head.data) {
			this._head.data = this._tail.data = data;
			this.length += 1;
		} else {
			const node = new Node(data);
			if (this.length === 1) {
				this._tail = node;
				this._head.next = this._tail;
				this._tail.prev = this._head;
			} else {
				node.prev = this._tail;
				this._tail.next = node;
				this._tail = node;
			}
			this.length += 1;
		}
		return this;
	}

    head() {
		return this._head.data;
	}

    tail() {
		return this._tail.data;
	}

    at(index) {
		if (index > this.length || index < 0) {
			throw new Error('invalid index');
		}
		let counter = 0;
		let current = this._head;
		while(counter != index) {
			current = current.next;
			counter++;
		}
		return current.data;
	}

    insertAt(index, data) {
		if (index > this.length || index < 0) {
			throw new Error('invalid index');
		} else if (index == 0) {
			let head = this._head;
			this._head = new Node(data);
			this._head.next = head;
			head.prev = this._head;
		} else {
			let counter = 0;
			let current = this._head;
			while(counter != index) {
				current = current.next;
				counter++;
			}
			const node = new Node(data);
			node.next = current;
			node.prev = current.prev;
			current.prev.next = node;
		}
		return this;
	}

    isEmpty() {
		return (this.length) ? false : true;
	}

    clear() {
		if (this.length > 0) {
			let current = this._head;
			while(this.length > 0) {
				current = current.next;
				if (current) {
					current.prev = null;
				}
				this.length--;
			}
		}
		this._head = this._tail = new Node();
		return this;
	}

    deleteAt(index) {
		if (index > this.length || index < 0) {
			throw new Error('invalid index');
		} else if (index == 0) {
			this._head = this._head.next;
			this.head.prev = null;
			this.length--; 
		} else {
			let counter = 0;
			let current = this._head;
			while(counter != index) {
				current = current.next;
				counter++;
			}
			current.next.prev = current.prev;
			current.prev.next = current.next;
			current = null;
		}
		return this;
	}

    reverse() {
		if (this.length == 0) {
			throw new Error('list is empty');
		}
		let current = this._head;
		while(current) {
			let next = current.next;
			current.next = current.prev;
			current.prev = current = next;
		}
		current = this._tail;
		this._tail = this._head;
		this._head = current;
		return this;
	}

    indexOf(data) {
		if (this.length == 0) {
			throw new Error('list is empty');
		}
		let index = 0;
		let current = this._head;
		while(current) {
			if (current.data === data) {
				return index;
			}
			index++;
			current = current.next;
		}
		return -1;
	}
}

module.exports = LinkedList;
