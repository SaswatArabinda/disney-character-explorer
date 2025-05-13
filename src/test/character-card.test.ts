import { fixture, html, expect } from '@open-wc/testing';
import "../components/favorites-panel";
import "../components/character-tabs";

describe('<favorites-panel>', () => {
  it('should load favorites from localStorage', async () => {
    localStorage.setItem('favorites', JSON.stringify([{ _id: '1', name: 'Ariel' }]));
    const el: any = await fixture(html`<favorites-panel></favorites-panel>`);
    await el.updateComplete;
    expect(el.favorites.length).to.equal(1);
  });
});


describe('<character-tabs>', () => {
  it('should switch tabs when clicked', async () => {
    const el: any = await fixture(html`<character-tabs></character-tabs>`);
    const tabs = el.shadowRoot.querySelectorAll('.tab');
    tabs[1].click();
    expect(el.activeTab).to.equal('favorites');
  });
});
