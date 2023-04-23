import { Layout } from "../../layout/Layout";
import { useEffect } from "react";
import { inject } from "mobx-react";

export const RefundRaw = ({ AppStore }) => {
  useEffect(() => {
    AppStore.setLoading(false);
  }, []);

  return (
    <Layout
      withSidebar={false}
      withRestaurantClosedModal={false}
      withSpotsModal={false}
      withBanner={false}
    >
      <p>
        <strong>
          <span
            style={{
              fontSize: 24,
            }}
          >
            Правила п
          </span>
        </strong>
        <strong>
          <span
            style={{
              fontSize: 24,
            }}
          >
            <strong>овернення коштів</strong>
          </span>
        </strong>
      </p>
      <p>
        <br />
      </p>
      <p>
        <strong>
          <span
            style={{
              fontSize: 14,
            }}
          >
            Повернення коштів або обмін товару відбувається у таких випадках як:
          </span>
        </strong>
      </p>
      <ol>
        <li>Товар неналежної якості, а саме: є ознаки зіпсованої продукції</li>
        <li>
          Якщо страва важить менше зазначеної ваги більш ніж на 5% (заміна
          товару)
        </li>
        <li>&nbsp;Замовлення прийнято та оплачено, але не виконано.</li>
      </ol>
      <p>
        <br />
      </p>
      <p>
        <strong>Для повернення або заміни необхідно надати:</strong>
      </p>
      <ol>
        <li>Товар чи частина товару</li>
        <li>Товарний чек</li>
        <li>
          Номер телефону та адреси (якщо це була доставка) якщо немає чека
        </li>
        <li>
          У разі якщо вага не відповідає зазначеній клієнт повинен
          зателефонувати на гарячу лінію та повідомити про дану ситуацію,
          зберегти продукцію в повному обсязі (якщо не в повному обсязі -
          продукція не підлягає заміні чи поверненню)
        </li>
      </ol>
      <p>
        <br />
      </p>
      <p>
        <strong>Як і коли повернути чи замінити товар</strong>
      </p>
      <ol>
        <li>Наш кур'єр приїжджає та забирає замовлення.</li>
        <li>Самостійно приносите замовлення до нашого закладу</li>
        <li>
          Після того, як забрали продукцію, ми перевіряємо на наявність порушень
        </li>
        <li>
          При виявленні порушень, у той же день або в інший зручний день та час
          виконуємо заміну
        </li>
      </ol>
      <p>
        <br />
      </p>
      <p>
        <strong>Повернення коштів</strong>
      </p>
      <ol>
        <li>Протягом 1-5 робочих днів повертаємо кошти на ваш рахунок</li>
      </ol>
    </Layout>
  );
};

export const Refund = inject("AppStore")(RefundRaw);
