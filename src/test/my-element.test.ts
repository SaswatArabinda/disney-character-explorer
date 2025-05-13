import { fixture, html, expect } from '@open-wc/testing';
import "./../my-element";
import sinon from 'sinon';

describe('<my-element>', () => {
  it('should mount', async () => {
    const el = await fixture(html`<my-element></my-element>`);
    expect(el).to.exist;
  });

  it('should apply filters correctly', async () => {
    const el: any = await fixture(html`<my-element></my-element>`);
    el.allCharacters = [{ name: 'Moana', films: ['Moana'] }];
    el.searchTerm = 'moana';
    el.filters = { franchise: 'films', role: '', era: '' };
    el.applyFilters();
    expect(el.characters.length).to.equal(1);
  });

  it('should fetch characters and store in sessionStorage', async () => {
    const el: any = await fixture(html`<my-element></my-element>`);
    const stub = sinon.stub(window, 'fetch').resolves({
      json: () => Promise.resolve({ data: [], info: { nextPage: null } }),
    } as Response);
    await el.fetchCharacters();
    expect(stub.calledOnce).to.be.true;
    stub.restore();
  });
});



