import axios from 'axios';

class ApiService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: 'https://localhost:8443/api',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Interceptor zum Setzen des Authorization-Headers
        this.apiClient.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;  // Setze den Token
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    // Product APIs
    getAllProducts() {
        return this.apiClient.get('/products');
    }

    getProductById(id) {
        return this.apiClient.get(`/products/${id}`);
    }

    createProduct(product) {
        return this.apiClient.post('/products', product);
    }

    updateProduct(id, product) {
        return this.apiClient.put(`/products/${id}`, product);
    }

    deleteProduct(id) {
        return this.apiClient.delete(`/products/${id}`);
    }

    // Auth APIs
    login(loginRequest) {
        return this.apiClient.post('/auth/login', loginRequest);
    }

    register(userDTO) {
        return this.apiClient.post('/auth/register', userDTO);
    }

    // Order APIs
    getAllOrders() {
        return this.apiClient.get('/orders');
    }

    getOrderById(id) {
        return this.apiClient.get(`/orders/${id}`);
    }

    createOrder(orderDTO) {
        return this.apiClient.post('/orders', orderDTO);
    }

    updateOrder(id, orderDTO) {
        return this.apiClient.put(`/orders/${id}`, orderDTO);
    }

    deleteOrder(id) {
        return this.apiClient.delete(`/orders/${id}`);
    }
    // Contact APIs
    createContactMessage(contactRequest) {
        return this.apiClient.post('/contact/send', contactRequest);
    }

    // User API
    getCurrentUser() {
        console.log(localStorage.getItem('token')); // Debugging-Ausgabe
        return this.apiClient.get('/auth/me', localStorage.getItem('token')); // Der Authorization-Header ist im Konstruktor enthalten
    }

    // Order APIs
    getOrdersByToken() {
        console.log('tst'); // Debugging-Ausgabe
        return this.apiClient.get('/orderproducts/user');
    }


    // Payment APIs
    /*processPayment(paymentRequest) {
        return this.apiClient.post('/payments', paymentRequest);
    }*/
}


const apiServiceInstance = new ApiService(); 
export default apiServiceInstance; 
