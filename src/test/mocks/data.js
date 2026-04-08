// Shared test fixture data for checkout flow tests

export const mockCartRegular = {
  id: "cart-uuid-123",
  total: "25.00 €",
  item_variants: [
    {
      id: 1,
      item_name: "Ameba T-shirt",
      price: "25.00 €",
      preview: "/img/tshirt.jpg",
      variant_details: { size: "M" },
      is_subscription: false,
      item_type: "article",
      discount_value: null,
      discount_name: null,
      subtotal: "25.00 €",
    },
  ],
  item_variant_ids: [1],
};

export const mockCartMultipleItems = {
  id: "cart-uuid-multi",
  total: "55.00 €",
  item_variants: [
    {
      id: 1,
      item_name: "Ameba T-shirt",
      price: "25.00 €",
      preview: "/img/tshirt.jpg",
      variant_details: { size: "M" },
      is_subscription: false,
      item_type: "article",
      discount_value: null,
      discount_name: null,
      subtotal: "25.00 €",
    },
    {
      id: 2,
      item_name: "Ameba Vinyl",
      price: "30.00 €",
      preview: "/img/vinyl.jpg",
      variant_details: { size: "unique" },
      is_subscription: false,
      item_type: "article",
      discount_value: null,
      discount_name: null,
      subtotal: "30.00 €",
    },
  ],
  item_variant_ids: [1, 2],
};

export const mockCartMember = {
  id: "cart-uuid-456",
  total: "30.00 €",
  item_variants: [
    {
      id: 2,
      item_name: "Soci Anual",
      price: "30.00 €",
      preview: "/img/soci.jpg",
      variant_details: { size: "unique" },
      is_subscription: true,
      item_type: "subscription",
      discount_value: null,
      discount_name: null,
      subtotal: "30.00 €",
    },
  ],
  item_variant_ids: [2],
};

export const mockCartFree = {
  id: "cart-uuid-789",
  total: "0.00 €",
  item_variants: [
    {
      id: 3,
      item_name: "Free Event Ticket",
      price: "0.00 €",
      preview: "/img/event.jpg",
      variant_details: { size: "unique" },
      is_subscription: false,
      item_type: "event",
      discount_value: null,
      discount_name: null,
      subtotal: "0.00 €",
    },
  ],
  item_variant_ids: [3],
};

export const mockCartDiscounted = {
  id: "cart-uuid-101",
  total: "20.00 €",
  item_variants: [
    {
      id: 1,
      item_name: "Ameba T-shirt",
      price: "25.00 €",
      preview: "/img/tshirt.jpg",
      variant_details: { size: "M" },
      is_subscription: false,
      item_type: "article",
      discount_value: 20,
      discount_name: "AMEBA20",
      subtotal: "20.00 €",
    },
  ],
  item_variant_ids: [1],
};

export const mockCheckoutPaid = {
  checkout_stripe: {
    client_secret: "pi_test_secret_123",
    stripe_public: "pk_test_123456",
  },
  amount: 2500,
};

export const mockCheckoutFree = {
  checkout_stripe: {},
  amount: 0,
};

export const mockMemberProfile = {
  username: "testuser",
  first_name: "Joan",
  last_name: "Garcia",
  identity_card: "12345678A",
  phone_number: "612345678",
  number: 42,
  type: "Socio",
};

export const mockEmptyMemberProfile = {};

export const mockUserData = {
  username: "testuser",
  password: "",
  email: "test@ameba.cat",
  member: true,
  date_joined: "2024-01-01",
};
