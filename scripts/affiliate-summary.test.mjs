import test from 'node:test';
import assert from 'node:assert/strict';
import { summarize } from './affiliate-summary.mjs';

test('a successful observation does not turn missing business metrics into zero sales or approval', () => {
  const text = summarize({schema:'affiliate-operations/v1',observedAt:'2026-10-15T12:00:00Z',findings:[],summary:{posts:208,activeCodeProducts:246,approvedCodeRoutes:0},public:{observations:[]},changes:{baseline:'first_run'}},{schema:'affiliate-program-watch/v1',observations:[{id:'apify',status:200}]});
  assert.match(text,/Account traffic, sales and revenue \| Not measured/);
  assert.match(text,/not an approval/);
  assert.doesNotMatch(text,/0 sales/);
});

test('untrusted observation text cannot inject HTML or a new markdown row', () => {
  const text = summarize({schema:'affiliate-operations/v1',observedAt:'x',findings:[],summary:{},public:{observations:[{kind:'x',url:'<script>\n| fake',error:'unknown'}]}},{schema:'affiliate-program-watch/v1',observations:[]});
  assert.ok(!text.includes('<script>'));
  assert.ok(!text.includes('\n| fake'));
});

test('changed terms and inaccessible sources are visible even when report generation succeeded', () => {
  const text = summarize({schema:'affiliate-operations/v1',observedAt:'x',findings:[],summary:{},public:{observations:[{kind:'home',url:'https://example.com/',status:503}]}},{schema:'affiliate-program-watch/v1',observations:[{id:'apify',status:'observed',change:'changed',reviewDue:true},{id:'beehiiv',status:'blocked',change:'notObserved',reviewDue:true,error:'access-gate-or-robot-denial'}]});
  assert.match(text,/owned HTTP 0\/1/);
  assert.match(text,/official program text 1\/2/);
  assert.match(text,/change: changed; reviewDue: true/);
  assert.match(text,/access-gate-or-robot-denial/);
});
