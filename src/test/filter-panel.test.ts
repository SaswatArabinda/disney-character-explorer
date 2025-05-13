import { fixture, html, expect } from '@open-wc/testing';
import "../components/filter-panel";
import sinon from 'sinon';

describe('<filter-panel>', () => {
  it('should populate dropdown options', async () => {
    const el: any = await fixture(html`<filter-panel></filter-panel>`);
    expect(el.franchiseOptions.length).to.be.greaterThan(0);
  });

  it('should emit filter-change event', async () => {
    const el: any = await fixture(html`<filter-panel></filter-panel>`);
    const spy = sinon.spy();
    el.addEventListener('filter-change', spy);
    el._onChange('franchise', 'films');
    expect(spy.calledOnce).to.be.true;
    expect(spy.firstCall.args[0].detail.franchise).to.equal('films');
  });
});
