import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Galeria from '../components/galeria/Galeria';
import LettersMove from '../components/layout/LettersMove'
import XMLParser from 'react-xml-parser';
import { FLICKR_ALBUM_ID, FLICKR_KEY } from '../utils/constants';
import PowerTitle from '../components/layout/PowerTitle';

export default function Galery() {
  const [t] = useTranslation("translation");
  const [galleryList, setGalleryList] = useState([]);

  const url = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${FLICKR_KEY}&photoset_id=${FLICKR_ALBUM_ID}&format=rest`;

  useEffect(() => {
    axios
      .get(`${url}`, {})
      .then((s) => {
        var xml = new XMLParser().parseFromString(s?.data);
        setGalleryList(xml.children[0].children)
      })
  }, [])

  const imgArrayBuilder = galleryList.map(el => {
    const { attributes } = el
    const SERVER_ID = attributes.server
    const ID = attributes.id
    const SECRET = attributes.secret
    const photoUrl = `https://live.staticflickr.com/${SERVER_ID}/${ID}_${SECRET}.jpg`
    return photoUrl
  })

  return (
    <div className="SupportContent"><div>
      <PowerTitle title="PARKFEST 22" subtitle="* 21-05-22 *" />
      <Galeria images={imgArrayBuilder} />
    </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#EB5E3E"
      />
    </div>
  );
}