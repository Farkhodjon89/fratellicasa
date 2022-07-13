import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { octoBasket, order, host } = req.body;

    let octo = {
      octo_shop_id: 1471,
      octo_secret: '6197eb4c-7a1d-4b67-8116-f48e33431ea7',
      shop_transaction_id: order.id,
      auto_capture: true,
      test: false,
      init_time: order.date_created.replace(/T/, ' '),
      total_sum: order.total,
      currency: 'USD',
      description: '',
      // basket: octoBasket,
      tsp_id: 18,
      return_url: `${host}/application-order/${order && order.order_key}`,
      notify_url: 'https://fratellicasa.com/cart',
      language: 'ru',
      ttl: 15,
    };

    let response;
    try {
      response = await axios.post('https://secure.octo.uz/prepare_payment', octo);
    } catch (e) {
      res.end(JSON.stringify({ status: false, message: e.message }));
      return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: true, data: response.data }));
  } else {
    res.setHeader('Allow', ['POST']);
    res.statusCode = 404;
    res.end();
  }
};
