import CartService from "../services/cart.service";
import {makeAutoObservable} from "mobx";

class Cart {
    constructor() {
        makeAutoObservable(this);
    }
    items = [];
    loading = false;
    total = 0;
    totalQuantity = 0;
    pending = [];

    fetchItems = () => {
        this.setLoading(true);
        return CartService.getProducts().then(res => {
            this.setItems(res.data.data);
            this.setTotal(res.data.meta.total)
            this.setTotalQuantity(res.data.meta.totalQuantity);
        }).catch(() => {
            this.setLoading(false);
        }).finally(() => {
            this.setLoading(false);
        });
    }

    addProduct = (params = {}) => {
        const {product_id} = params;

        this.setLoading(true);
        this.setPending([...this.pending, product_id]);
        return CartService.addProduct(params).then((res) => {
            this.setItems(res.data.data);
            this.setTotal(res.data.meta.total)
            this.setTotalQuantity(res.data.meta.totalQuantity);
        }).finally(() => {
            this.setLoading(false);
            this.setPending(this.pending.filter(id=> id !== product_id));
        }).catch(() => {
            this.setLoading(false);
            this.setPending(this.pending.filter(id=> id !== product_id));
        });
    }

    setName = (name) => {
        this.name = name;
    }

    setItems = (categories) => {
        this.items = categories;
    }

    setLoading = (state) => {
        this.loading = state;
    }

    setPending = (value) => {
        this.pending = value;
    }

    setTotal = (value) => {
        this.total = value;
    }

    setTotalQuantity = (value) => {
        this.totalQuantity = value;
    }


}

const CartStore = new Cart();

export {
    CartStore
}