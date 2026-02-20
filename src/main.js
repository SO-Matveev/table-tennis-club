import './style.css';
import content from './data/content.json';

import { renderHeader } from './sections/header';
import { renderHero } from './sections/hero';
import { renderAbout } from './sections/about';
import { renderCoaches } from './sections/coaches';
import { renderPricing } from './sections/pricing';
import { renderGallery } from './sections/gallery';
import { renderReviews } from './sections/reviews';
import { renderContacts } from './sections/contacts';

const app = document.getElementById('app');

app.append(
  renderHeader(content.header),
  renderHero(content.hero),
  renderAbout(content.about),
  renderCoaches(content.coaches),
  renderPricing(content.pricing),
  renderGallery(content.gallery),
  renderReviews(content.reviews),
  renderContacts(content.contacts)
);