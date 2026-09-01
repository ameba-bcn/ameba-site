import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";
import { formatPrice, urlify } from "../../utils/utils";
import { gsap, prefersReducedMotion } from "../../utils/gsapSetup";
import useCartStore from "../../stores/useCartStore";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import DotsRow from "../../components/ui/DotsRow";
import ProductDetails from "../../components/cardView/ProductDetails";
import CardViewButton from "../../components/cardView/CardViewButton";
import CartToast from "../../components/toast/CartToast";
import "./ProductePage.css";

function buildProductJsonLd(data, id) {
  if (!data?.name) return null;
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    url: `https://ameba.cat/botiga/${id}`,
    brand: { "@type": "Brand", name: "AMEBA" },
  };
  if (data.images?.length > 0) ld.image = data.images;
  if (data.description) {
    ld.description = data.description.replace(/<[^>]+>/g, "").slice(0, 500);
  }
  if (data.price) {
    ld.offers = {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: data.price,
      availability:
        data.has_stock === false
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `https://ameba.cat/botiga/${id}`,
    };
  }
  return ld;
}

function ProductePage() {
  const { id } = useParams();
  const [t] = useTranslation("translation");
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sizes, setSizes] = useState([]);
  const [activeSize, setActiveSize] = useState([]);
  const [selectSizeError, setSelectSizeError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setProduct(null);
    axiosInstance
      .get(`${API_URL}articles/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.warn("ERROR: ", err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const variants = product?.variants || [];
    if (variants.length === 0) {
      setSizes([]);
      return;
    }
    const available = [];
    variants.forEach((v) => {
      if (v.attributes && (v.stock > 0 || v.stock === -1)) {
        available.push(v.attributes[0].value.toUpperCase());
      }
    });
    setSizes(available);
  }, [product]);

  const jsonLd = useMemo(() => buildProductJsonLd(product, id), [product, id]);

  const name = product?.name || "";
  const images = product?.images || [];
  const description = product?.description ? urlify(product.description) : null;
  const priceLabel =
    product?.price_range || (product?.price ? formatPrice(product.price) : "");
  const discount = product?.discount || 0;
  const discountedPrice =
    discount && product?.price
      ? formatPrice(Number(product.price) * (1 - discount / 100))
      : null;
  const productSoldOut = sizes.length === 0;

  const handleAddToCart = () => {
    if (activeSize.length === 0) {
      setSelectSizeError(true);
      return;
    }
    setSelectSizeError(false);
    const variant = product?.variants?.find(
      (v) => v.attributes[0]?.value?.toLowerCase() === activeSize.toLowerCase(),
    );
    if (!variant?.id) return;
    addToCart(variant.id).then(() => {
      toast(<CartToast />, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: "toast-black-background",
      });
      // §4.2 — the cart icon pulses as feedback; it's conditionally
      // mounted only once the cart has items, so it may not exist yet.
      if (!prefersReducedMotion()) {
        const cartIcon = document.querySelector(".cartIconMenu");
        if (cartIcon) {
          gsap.to(cartIcon, { scale: 1.25, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.inOut" });
        }
      }
    });
  };

  if (!loading && !name) {
    return (
      <PageLayout section="shop" promo>
        <PageMeta title={t("menu.shop")} url={`/botiga/${id}`} />
        <div className="shop-product__not-found">
          <p>{t("errors.linkBuit1")}</p>
          <p>{t("errors.linkBuit2")}</p>
          <Link to="/botiga" className="shop-product__back-link">
            {t("botiga.torna")}
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout section="shop" promo loading={loading}>
      {!loading && name && (
        <PageMeta
          title={name}
          description={
            product.description
              ? product.description.replace(/<[^>]+>/g, "").slice(0, 200)
              : undefined
          }
          image={images[0] || undefined}
          url={`/botiga/${id}`}
          type="product"
          jsonLd={jsonLd}
        />
      )}
      {!loading && name && (
        <div className="shop-product">
          <nav aria-label={t("botiga.breadcrumb")} className="shop-product__breadcrumb">
            <Link to="/">AMEBA</Link>
            <span>|</span>
            <Link to="/botiga">{t("menu.shop")}</Link>
            <span>|</span>
            <span>{name}</span>
          </nav>
          <hr className="shop-product__hr" />

          <section className="shop-product__hero">
            <div className="shop-product__hero-left">
              <DotsRow count={7} className="shop-product__dots" />
              <h1 className="shop-product__title">{name}</h1>

              {priceLabel && (
                <div className="shop-product__price-row">
                  <span className="shop-product__price">{priceLabel}</span>
                  {discountedPrice && (
                    <span className="shop-product__price-pill">
                      {t("botiga.socis-preu")} {discountedPrice}
                    </span>
                  )}
                </div>
              )}

              {description && (
                <div className="shop-product__description">
                  <p>{description}</p>
                  <p>{t("botiga.enviament")}</p>
                </div>
              )}

              <ul className="shop-product__facts">
                <li>{t("botiga.fitxa-1")}</li>
                <li>{t("botiga.fitxa-2")}</li>
                <li>{t("botiga.fitxa-3")}</li>
              </ul>
            </div>

            <div className="shop-product__gallery">
              {[0, 1].map((i) => (
                <div key={i} className="shop-product__gallery-cell">
                  {images[i] ? (
                    <img src={images[i]} alt={name} className="shop-product__gallery-image" />
                  ) : (
                    <div className="shop-product__gallery-placeholder" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="shop-product__buybar" aria-label={t("modal.afegir")}>
            <ProductDetails
              sizes={sizes}
              activeSize={activeSize}
              setActiveSize={setActiveSize}
              selectSizeError={selectSizeError}
              setSelectSizeError={setSelectSizeError}
              productSoldOut={productSoldOut}
            />
            <div className="shop-product__cta">
              <CardViewButton
                type="PRODUCTE"
                onAddToCart={handleAddToCart}
                productSoldOut={productSoldOut}
                activeSize={activeSize}
              />
            </div>
          </section>
        </div>
      )}
    </PageLayout>
  );
}

export default ProductePage;
