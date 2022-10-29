import  {makeAutoObservable} from "mobx";

class Spots {

    constructor() {
        makeAutoObservable(this);
    }

    loading = false;
    items = [];
    selectedIndex = null;
    needRefresh = false;
    userSelectedSpot = false;

    setSelectedIndex = (index) => {
        this.selectedIndex = index;
    }

    setLoading = (state) => {
        this.loading = state;
    }

    get getAddress() {
        return this.getSelected?.address
    }

    get getPhones() {
        return this.getSelected?.phones;
    }

    get hasPhones() {
        return this.getPhones && this.getPhones !== '';
    }

    get getSelected() {
        return this.items?.[this.selectedIndex]
    }

    get getSelectedIndex() {
        return this.selectedIndex;
    }

    setItems = (items) => {
        this.items = items;
    }

    setUserSelectedSpot = (state) => {
        this.userSelectedSpot = state;
    }
}

const SpotsStore = new Spots();

export {
    SpotsStore
}