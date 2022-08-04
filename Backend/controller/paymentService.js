const axios = require("axios");

class PaymentService {
  async createPayment(data, user) {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const itemsForBuy = data.map(item => {
        return {
            id: item._id,
            title: item.name,
            description: item.description,
            picture_url: item.imageURL,
            quantity: item.quantity,
            currency_id: "ARS",
            unit_price: item.price,
        }
    }
    );
    const body = {
      payer_email: user.email,
      items: itemsForBuy,
      back_urls: {
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
        success: "http://localhost:3000/success"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS"
      },
      back_url: "https://google.com.ar",
      payer_email: user.email
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }
}

module.exports = PaymentService;