import { fixture, html, expect } from '@open-wc/testing';
import "../components/search-bar";

describe('<search-bar>', () => {
  it('should display suggestions on input', async () => {
    const el: any = await fixture(html`<search-bar .allCharacters=${[{ name: 'Elsa' }]}></search-bar>`);
    const input = el.shadowRoot.querySelector('input');
    input.value = 'els';
    input.dispatchEvent(new Event('input'));

    await new Promise(r => setTimeout(r, 350));
    expect(el.suggestions.length).to.equal(1);
  });

});
