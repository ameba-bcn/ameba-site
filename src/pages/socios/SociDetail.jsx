import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";
import { sanitizeHTML, sanitizeEmbed } from "../../utils/sanitize";
import { iframesValidation } from "../../utils/validations";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import DotsRow from "../../components/ui/DotsRow";
import "./SociDetail.css";

function SociDetail() {
  const { id } = useParams();
  const [t] = useTranslation("translation");
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setProject(null);
    axiosInstance
      .get(`${API_URL}member_projects/${id}/`)
      .then((res) => setProject(res.data))
      .catch((err) => console.warn("ERROR: ", err))
      .finally(() => setLoading(false));
  }, [id]);

  const name = project?.project_name || "";
  const firstName = project?.first_name || "";
  const portrait = project?.images?.[0];
  const description = project?.description ? sanitizeHTML(project.description) : "";
  const tags = project?.tags || [];
  const genres = project?.genres || [];
  const memberNumber = project?.member_number;

  const mediaUrls = project?.media_urls || [];
  const embeds = mediaUrls
    .filter((link) => iframesValidation(link))
    .map((link) => sanitizeEmbed(link))
    .filter(Boolean);
  const links = mediaUrls.filter((link) => !iframesValidation(link));

  const notFound = !loading && !name;

  if (notFound) {
    return (
      <PageLayout section="socis" promo>
        <PageMeta title={t("footer.socios")} url={`/associacio/socis/${id}`} />
        <div className="soci-detail__not-found">
          <p>{t("errors.linkBuit1")}</p>
          <p>{t("errors.linkBuit2")}</p>
          <Link to="/associacio/socis" className="soci-detail__back-link">
            {t("soci.directori-torna")}
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout section="socis" promo loading={loading}>
      {!loading && name && (
        <PageMeta
          title={name}
          description={
            description ? description.replace(/<[^>]+>/g, "").slice(0, 200) : undefined
          }
          image={portrait || undefined}
          url={`/associacio/socis/${id}`}
        />
      )}
      {!loading && name && (
        <div className="soci-detail">
          <nav aria-label={t("soci.directori-breadcrumb")} className="soci-detail__breadcrumb">
            <Link to="/">AMEBA</Link>
            <span>|</span>
            <Link to="/associacio">{t("menu.associacio")}</Link>
            <span>|</span>
            <Link to="/associacio/socis">{t("soci.directori-breadcrumb")}</Link>
            <span>|</span>
            <span>{name}</span>
          </nav>

          <section className="soci-detail__band soci-detail__band--cream">
            <div className="soci-detail__shell soci-detail__hero">
              <DotsRow count={7} className="soci-detail__dots" />
              <h1 className="soci-detail__title">{name}</h1>
              {firstName && (
                <span className="soci-detail__by">
                  {t("soci.per")} {firstName}
                </span>
              )}
              {(tags.length > 0 || genres.length > 0) && (
                <div className="soci-detail__chips">
                  {tags.map((tag) => (
                    <span key={tag} className="soci-detail__chip soci-detail__chip--fill">
                      {tag}
                    </span>
                  ))}
                  {genres.map((genre) => (
                    <span key={genre} className="soci-detail__chip">
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="soci-detail__band soci-detail__band--negro">
            <div className="soci-detail__shell soci-detail__body">
              <div className="soci-detail__bio">
                {description ? (
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                ) : null}
              </div>
              <div className="soci-detail__portrait">
                {portrait ? (
                  <img src={portrait} alt={name} className="soci-detail__portrait-image" />
                ) : (
                  <div className="soci-detail__portrait-placeholder" aria-hidden="true" />
                )}
              </div>
            </div>
          </section>

          <section className="soci-detail__band soci-detail__band--cream">
            <div className="soci-detail__shell soci-detail__media">
              {embeds.length > 0 && (
                <div className="soci-detail__section">
                  <h2 className="soci-detail__section-title">ESCOLTA</h2>
                  <div className="soci-detail__embeds">
                    {embeds.map((embed, i) => (
                      <div
                        key={i}
                        className="soci-detail__embed"
                        dangerouslySetInnerHTML={{ __html: embed }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {links.length > 0 && (
                <div className="soci-detail__section">
                  <h2 className="soci-detail__section-title">LINKS</h2>
                  <div className="soci-detail__links">
                    {links.map((link, i) =>
                      /^https?:\/\//i.test(link) ? (
                        <a
                          key={i}
                          className="soci-detail__link"
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.split("www.")[1] || link}
                        </a>
                      ) : (
                        <span key={i} className="soci-detail__link">
                          {link}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}

              <div className="soci-detail__footer-row">
                {memberNumber && (
                  <span className="soci-detail__member-number">
                    {t("form.soci")} {memberNumber}
                  </span>
                )}
                <Link to="/associacio/socis" className="soci-detail__link">
                  ← {t("soci.directori-torna")}
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </PageLayout>
  );
}

export default SociDetail;
