import xs from 'xstream'
import {div} from '@cycle/dom'

export default function TypographyPage () {
  return {
    Title: xs.of('Typography Page'),
    DOM: xs.of(div({props: {innerHTML: innerHTML}})),
  }
}

const innerHTML = `<div class="section-box animate-up animated">
<h2>Typography Page</h2>
<div class="clearfix"><h2>2 Columns</h2>
<div class="row">
<div class="col-sm-6">
<h3>ONE HALF</h3>
<p>Established fact that a reader will be distracted by the readable content of a page when lookingt its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p></div>
<div class="col-sm-6">
<h3>ONE HALF</h3>
<p>Established fact that a reader will be distracted by the readable content of a page when lookingt its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p></div>
</div>
<h2>3 Columns</h2>
<div class="row">
<div class="col-sm-4">
<h3>ONE&nbsp;THIRD</h3>
<p>Established fact that a reader will be distracted by the readable content of a page when lookingt its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p></div>
<div class="col-sm-4">
<h3>ONE&nbsp;THIRD</h3>
<p>Established fact that a reader will be distracted by the readable content of a page when lookingt its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p></div>
<div class="col-sm-4">
<h3>ONE&nbsp;THIRD</h3>
<p>Established fact that a reader will be distracted by the readable content of a page when lookingt its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p></div>
</div>
<h2>4 Columns</h2>
<div class="row">
<div class="col-sm-3">
<h3>ONE&nbsp;FOURTH</h3>
<p>Established fact that a reader will be distracted by the readable content of a page when lookingt its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p></div>
<div class="col-sm-3">
<h3>ONE&nbsp;FOURTH</h3>
<p>Established fact that a reader will be distracted by the readable content of a page when lookingt its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p></div>
<div class="col-sm-3">
<h3>ONE&nbsp;FOURTH</h3>
<p>Established fact that a reader will be distracted by the readable content of a page when lookingt its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p></div>
<div class="col-sm-3">
<h3>ONE&nbsp;FOURTH</h3>
<p>Established fact that a reader will be distracted by the readable content of a page when lookingt its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p></div>
</div>
<h2>Headings</h2>
<h1>Header one</h1>
<h2>Header two</h2>
<h3>Header three</h3>
<h4>Header four</h4>
<h5>Header five</h5>
<h6>Header six</h6>
<p>Lorem ipsum dolor sit amet, <a href="http://rscard.novembit.com/typography.html#">link example</a>. In fringilla libero dui, porttitor condimentum dui tempor nec. Donec eleifend ligula non magna maximus, eget vehicula turpis viverra. Donec luctus purus eget dui faucibus congue. Maecenas id dui ut felis mollis ornare. Phasellus maximus felis sapien, facilisis ultricies elit lacinia id. Sed iaculis eget est non placerat. Suspendisse malesuada risus a varius gravida. Curabitur blandit lacus in condimentum facilisis. Aenean quis ligula quis dolor commodo suscipit. Ut nec pellentesque ipsum. Vestibulum dapibus ligula massa, id blandit eros sagittis a. Duis nisi mauris, pulvinar at risus bibendum, elementum rutrum lorem. Suspendisse congue aliquam tortor, et viverra purus convallis at.</p>
<hr>
<p>Lorem ipsum dolor sit amet, <em>italic text example</em>. In fringilla libero dui, porttitor condimentum dui tempor nec. Donec eleifend ligula non magna maximus, eget vehicula turpis viverra. Donec luctus purus eget dui faucibus congue. Maecenas id dui ut felis mollis ornare. Phasellus maximus felis sapien, facilisis ultricies elit lacinia id. Sed iaculis eget est non placerat. Suspendisse malesuada risus a varius gravida. Curabitur blandit lacus in condimentum facilisis. Aenean quis ligula quis dolor commodo suscipit. Ut nec pellentesque ipsum. Vestibulum dapibus ligula massa, id blandit eros sagittis a. Duis nisi mauris, pulvinar at risus bibendum, elementum rutrum lorem. Suspendisse congue aliquam tortor, et viverra purus convallis at.</p>
<p>Lorem ipsum dolor sit amet, <strong>bold text example</strong>. In fringilla libero dui, porttitor condimentum dui tempor nec. Donec eleifend ligula non magna maximus, eget vehicula turpis viverra. Donec luctus purus eget dui faucibus congue. Maecenas id dui ut felis mollis ornare. Phasellus maximus felis sapien, facilisis ultricies elit lacinia id. Sed iaculis eget est non placerat. Suspendisse malesuada risus a varius gravida. Curabitur blandit lacus in condimentum facilisis. Aenean quis ligula quis dolor commodo suscipit. Ut nec pellentesque ipsum. Vestibulum dapibus ligula massa, id blandit eros sagittis a. Duis nisi mauris, pulvinar at risus bibendum, elementum rutrum lorem. Suspendisse congue aliquam tortor, et viverra purus convallis at.</p>
<h2>Blockquotes</h2>
<p>Single line blockquote:</p>
<blockquote><p>Stay hungry. Stay foolish.</p></blockquote>
<p>Multi line blockquote with a cite reference:</p>
<blockquote><p>People think focus means saying yes to the thing you’ve got to focus on. But that’s not what it means at all. It means saying no to the hundred other good ideas that there are. You have to pick carefully. I’m actually as proud of the things we haven’t done as the things I have done. Innovation is saying no to 1,000 things.</p>
<p><cite>Steve Jobs – Apple Worldwide Developers’ Conference, 1997</cite></p></blockquote>
<p>blockquote with cite:</p>
<blockquote><p>Only one thing is impossible for God: To find any sense in any copyright law on the planet.<br>
<cite><a href="http://www.brainyquote.com/quotes/quotes/m/marktwain163473.html">Mark Twain</a> – Mark Twain Quotes</cite></p></blockquote>
<h2>Tables</h2>
<table>
<thead>
<tr>
<th>Employee</th>
<th>Salary</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<th><a href="http://example.org/">John Doe</a></th>
<td>$1</td>
<td>Because that’s all Steve Jobs needed for a salary.</td>
</tr>
<tr>
<th><a href="http://example.org/">Jane Doe</a></th>
<td>$100K</td>
<td>For all the blogging she does.</td>
</tr>
<tr>
<th><a href="http://example.org/">Fred Bloggs</a></th>
<td>$100M</td>
<td>Pictures are worth a thousand words, right? So Jane x 1,000.</td>
</tr>
<tr>
<th><a href="http://example.org/">Jane Bloggs</a></th>
<td>$100B</td>
<td>With hair like that?! Enough said…</td>
</tr>
</tbody>
</table>
<h2>Definition Lists</h2>
<dl>
<dt>Definition List Title</dt>
<dd>Definition list division.</dd>
<dt>Startup</dt>
<dd>A startup company or startup is a company or temporary organization designed to search for a repeatable and scalable business model.</dd>
<dt>#dowork</dt>
<dd>Coined by Rob Dyrdek and his personal body guard Christopher “Big Black” Boykins, “Do Work” works as a self motivator, to motivating your friends.</dd>
<dt>Do It Live</dt>
<dd>I’ll let Bill O’Reilly will <a title="We'll Do It Live" href="https://www.youtube.com/watch?v=O_HyZ5aW76c">explain</a> this one.</dd>
</dl>
<h2>Unordered List (Nested)</h2>
<ul>
<li>List item one
<ul>
<li>List item one
<ul>
<li>List item one</li>
<li>List item two</li>
<li>List item three</li>
<li>List item four</li>
</ul>
</li>
<li>List item two</li>
<li>List item three</li>
<li>List item four</li>
</ul>
</li>
<li>List item two</li>
<li>List item three</li>
<li>List item four</li>
</ul>
<h2>Ordered List (Nested)</h2>
<ol>
<li>List item one
<ol>
<li>List item one
<ol>
<li>List item one</li>
<li>List item two</li>
<li>List item three</li>
<li>List item four</li>
</ol>
</li>
<li>List item two</li>
<li>List item three</li>
<li>List item four</li>
</ol>
</li>
<li>List item two</li>
<li>List item three</li>
<li>List item four</li>
</ol>
<h2>Styled List (Nested)</h2>
<ul class="styled-list">
<li>List item one
<ul>
<li>List item one
<ul>
<li>List item one</li>
<li>List item two</li>
<li>List item three</li>
<li>List item four</li>
</ul>
</li>
<li>List item two</li>
<li>List item three</li>
<li>List item four</li>
</ul>
</li>
<li>List item two</li>
<li>List item three</li>
<li>List item four</li>
</ul>
<p>&nbsp;</p>
<h2>HTML Tags</h2>
<p>These supported tags come from the WordPress.com code <a title="Code" href="http://en.support.wordpress.com/code/">FAQ</a>.</p>
<p><strong>Address Tag</strong></p>
<address>1 Infinite Loop<br>
Cupertino, CA 95014<br>
United States</address>
<p><strong>Anchor Tag (aka. Link)</strong></p>
<p>This is an example of a <a title="Apple" href="http://apple.com/">link</a>.</p>
<p><strong>Abbreviation Tag</strong></p>
<p>The abbreviation <abbr title="Seriously">srsly</abbr> stands for “seriously”.</p>
<p><strong>Cite Tag</strong></p>
<p>“Code is poetry.” —<cite>Automattic</cite></p>
<p><strong>Code Tag</strong></p>
<p>You will learn later on in these tests that <code>word-wrap: break-word;</code> will be your best friend.</p>
<p><strong>Delete Tag</strong></p>
<p>This tag will let you <del>strikeout text</del>, but this tag is no longer supported in HTML5 (use the <code>&lt;strike&gt;</code>instead).</p>
<p><strong>Emphasize Tag</strong></p>
<p>The emphasize tag should <em>italicize</em> text.</p>
<p><strong>Insert Tag</strong></p>
<p>This tag should denote <ins>inserted</ins> text.</p>
<p><strong>Keyboard Tag</strong></p>
<p>This scarcely known tag emulates <kbd>keyboard text</kbd>, which is usually styled like the <code>&lt;code&gt;</code> tag.</p>
<p><strong>Preformatted Tag</strong></p>
<p>This tag styles large blocks of code.</p>
<pre>.post-title {
					margin: 0 0 5px;
					font-weight: bold;
					font-size: 38px;
					line-height: 1.2;
					and here's a line of some really, really, really, really long text, just to see how the PRE tag handles it and to find out how it overflows;
				}</pre>
<p><strong>Quote Tag</strong></p>
<p><q>Developers, developers, developers…</q> –Steve Ballmer</p>
<p><strong>Strong Tag</strong></p>
<p>This tag shows <strong>bold<strong> text.</strong></strong></p>
<p><strong>Subscript Tag</strong></p>
<p>Getting our science styling on with H<sub>2</sub>O, which should push the “2” down.</p>
<p><strong>Superscript Tag</strong></p>
<p>Still sticking with science and Isaac Newton’s E = MC<sup>2</sup>, which should lift the 2 up.</p>
<p><strong>Variable Tag</strong></p>
<p>This allows you to denote <var>variables</var>.</p>
<h2>Image Alignment</h2>
<p>Welcome to image alignment! The best way to demonstrate the ebb and flow of the various image positioning options is to nestle them snuggly among an ocean of words. Grab a paddle and let’s get started.</p>
<p>On the topic of alignment, it should be noted that users can choose from the options of&nbsp;<em>None</em>,&nbsp;<em>Left</em>,&nbsp;<em>Right,</em>and&nbsp;<em>Center</em>. In addition, they also get the options of&nbsp;<em>Thumbnail</em>,&nbsp;<em>Medium</em>,&nbsp;<em>Large</em>&nbsp;&amp;&nbsp;<em>Fullsize</em>.</p>
<p><img class="size-full wp-image-906 aligncenter" title="Image Alignment 580x300" src="http://rscard.novembit.com/img/uploads/image-alignment-580x3001.jpg" alt="Image Alignment 580x300" width="580" height="300"></p>
<p>The image above happens to be&nbsp;<em><strong>centered</strong></em>.</p>
<p><strong><img class="size-full wp-image-904 alignleft" title="Image Alignment 150x150" src="http://rscard.novembit.com/img/uploads/image-alignment-150x1501.jpg" alt="Image Alignment 150x150" width="150" height="150"></strong>The rest of this paragraph is filler&nbsp;for the sake of seeing the text wrap around the 150×150 image, which is <em><strong>left aligned</strong></em>.</p>
<p>As you can see the should be some space above, below, and to the right of the image. The text should not be creeping on the image. Creeping is just not right. Images need breathing room too. Let them speak like you words. Let them do their jobs without any hassle from the text. In about one more&nbsp;sentence&nbsp;here, we’ll see that the text moves from the right of the image down below the image in&nbsp;seamless&nbsp;transition. Again, letting the do it’s thang.&nbsp;Mission accomplished!</p>
<p>And now for a <em><strong>massively large image</strong></em>. It also has <em><strong>no alignment</strong></em>.</p>
<p><img class="alignnone wp-image-907" title="Image Alignment 1200x400" src="http://rscard.novembit.com/img/uploads/image-alignment-1200x40021.jpg" alt="Image Alignment 1200x400" width="1200" height="400"></p>
<p>The image above, though 1200px wide, should not overflow the content area. It should remain contained with no visible disruption to the flow of content.</p>
<p><img class="size-full wp-image-905 alignright" title="Image Alignment 300x200" src="http://rscard.novembit.com/img/uploads/image-alignment-300x2001.jpg" alt="Image Alignment 300x200" width="300" height="200"></p>
<p>And now we’re going to shift things to the <em><strong>right align</strong></em>. Again, there should be plenty of room above, below, and to the left of the image. Just look at him there… Hey guy! Way to rock that right side. I don’t care what the left aligned image says, you look great. Don’t let anyone else tell you differently.</p>
<p>In just a bit here, you should see the text start to wrap below the right aligned image and settle in nicely. There should still be plenty of room and everything should be sitting pretty.&nbsp;Yeah… Just like that. It never felt so good to be right.</p>
<p>And just when you thought we were done, we’re going to do them all over again with captions!</p>
<figure id="attachment_906" class="wp-caption aligncenter"><img class="size-full wp-image-906 " title="Image Alignment 580x300" src="http://rscard.novembit.com/img/uploads/image-alignment-580x3001.jpg" alt="Image Alignment 580x300" width="580" height="300"><figcaption class="wp-caption-text">Look at 580×300 getting some <a title="Image Settings" href="http://en.support.wordpress.com/images/image-settings/">caption</a> love.</figcaption></figure>
<p>The image above happens to be&nbsp;<em><strong>centered</strong></em>. The caption also has a link in it, just to see if it does anything funky.</p>
<figure id="attachment_904" class="wp-caption alignleft"><img class="size-full wp-image-904 " title="Image Alignment 150x150" src="http://rscard.novembit.com/img/uploads/image-alignment-150x1501.jpg" alt="Image Alignment 150x150" width="150" height="150"><figcaption class="wp-caption-text">Itty-bitty caption.</figcaption></figure>
<p>The rest of this paragraph is filler&nbsp;for the sake of seeing the text wrap around the 150×150 image, which is <em><strong>left aligned</strong></em>.</p>
<p>As you can see the should be some space above, below, and to the right of the image. The text should not be creeping on the image. Creeping is just not right. Images need breathing room too. Let them speak like you words. Let them do their jobs without any hassle from the text. In about one more&nbsp;sentence&nbsp;here, we’ll see that the text moves from the right of the image down below the image in&nbsp;seamless&nbsp;transition. Again, letting the do it’s thang. Mission accomplished!</p>
<p>And now for a <em><strong>massively large image</strong></em>. It also has <em><strong>no alignment</strong></em>.</p>
<figure id="attachment_907" class="wp-caption alignnone"><img class=" wp-image-907" title="Image Alignment 1200x400" src="http://rscard.novembit.com/img/uploads/image-alignment-1200x40021.jpg" alt="Image Alignment 1200x400" width="1200" height="400"><figcaption class="wp-caption-text">Massive image comment for your eyeballs.</figcaption></figure>
<p>The image above, though 1200px wide, should not overflow the content area. It should remain contained with no visible disruption to the flow of content.</p>
<figure id="attachment_905" class="wp-caption alignright"><img class="size-full wp-image-905 " title="Image Alignment 300x200" src="http://rscard.novembit.com/img/uploads/image-alignment-300x2001.jpg" alt="Image Alignment 300x200" width="300" height="200"><figcaption class="wp-caption-text">Feels good to be right all the time.</figcaption></figure>
<p>And now we’re going to shift things to the <em><strong>right align</strong></em>. Again, there should be plenty of room above, below, and to the left of the image. Just look at him there… Hey guy! Way to rock that right side. I don’t care what the left aligned image says, you look great. Don’t let anyone else tell you differently.</p>
<p>In just a bit here, you should see the text start to wrap below the right aligned image and settle in nicely. There should still be plenty of room and everything should be sitting pretty. Yeah… Just like that. It never felt so good to be right.</p>
<p>And that’s a wrap, yo! You survived the&nbsp;tumultuous&nbsp;waters of alignment. Image alignment achievement unlocked!</p>
<h2>Text Alignment</h2>
<h3>Default</h3>
<p>This is a paragraph. It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love. Completely neutral and not picking a side or sitting on the fence. It just is. It just freaking is. It likes where it is. It does not feel compelled to pick a side. Leave him be. It will just be better that way. Trust me.</p>
<h3>Left Align</h3>
<p class="text-left">This is a paragraph. It is left aligned. Because of this, it is a bit more liberal in it’s views. It’s favorite color is green. Left align tends to be more eco-friendly, but it provides no concrete evidence that it really is. Even though it likes share the wealth evenly, it leaves the equal distribution up to justified alignment.</p>
<h3>Center Align</h3>
<p class="text-center">This is a paragraph. It is center aligned. Center is, but nature, a fence sitter. A flip flopper. It has a difficult time making up its mind. It wants to pick a side. Really, it does. It has the best intentions, but it tends to complicate matters more than help. The best you can do is try to win it over and hope for the best. I hear center align does take bribes.</p>
<h3>Right Align</h3>
<p class="text-right">This is a paragraph. It is right aligned. It is a bit more conservative in it’s views. It’s prefers to not be told what to do or how to do it. Right align totally owns a slew of guns and loves to head to the range for some practice. Which is cool and all. I mean, it’s a pretty good shot from at least four or five football fields away. Dead on. So boss.</p>
<h3>Justify Align</h3>
<p class="text-justify">This is a paragraph. It is justify aligned. It gets really mad when people associate it with Justin Timberlake. Typically, justified is pretty straight laced. It likes everything to be in it’s place and not all cattywampus&nbsp;like the rest of the aligns. I am not saying that makes it better than the rest of the aligns, but it does tend to put off more of an&nbsp;elitist&nbsp;attitude.</p>
<div class="docs-section">
<h2 class="docs-title">Buttons</h2>
</div>
<div class="docs-section">
<p><a class="btn btn-sm btn-border ripple" target="_blank" href="#">Bordered Small</a> <a class="btn btn-sm btn-default ripple" target="_blank" href="#">Default Small</a> <a class="btn btn-sm btn-primary ripple" target="_blank" href="#">Primary Small</a> <a class="btn btn-sm btn-warning ripple" target="_blank" href="#">Danger Small</a></p>
<p><a class="btn  btn-border ripple" target="_blank" href="#">Bordered Normal</a>&nbsp;<a class="btn  btn-default ripple" target="_blank" href="#">Default Normal</a>&nbsp;<a class="btn  btn-primary ripple" target="_blank" href="#">Primary Normal</a>&nbsp;<a class="btn  btn-warning ripple" target="_blank" href="#">Danger Normal</a></p>
<p><a class="btn btn-lg btn-border ripple" target="_blank" href="#">Bordered Large</a>&nbsp;<a class="btn btn-lg btn-default ripple" target="_blank" href="#">Default Large</a>&nbsp;<a class="btn btn-lg btn-primary ripple" target="_blank" href="#">Primary Large</a>&nbsp;<a class="btn btn-lg btn-warning ripple" target="_blank" href="#">Warning Large</a></p>
</div>
<h2>Slider</h2>
<div class="slider slick-initialized slick-slider"><button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style="display: block;">Previous</button>
<div aria-live="polite" class="slick-list draggable"><div class="slick-track" role="listbox" style="opacity: 1; width: 4200px; transform: translate3d(-1680px, 0px, 0px);"><div class="rsslide slick-slide slick-cloned" data-slick-index="-1" aria-hidden="true" tabindex="-1" style="width: 840px;"><img src="http://dev.novembit.com/rs_card/wp-content/uploads/2016/09/slider.jpg" alt="slide"></div><div class="rsslide slick-slide" data-slick-index="0" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide00" style="width: 840px;"><img src="http://dev.novembit.com/rs_card/wp-content/uploads/2016/09/slider.jpg" alt="slide"></div><div class="rsslide slick-slide slick-current slick-active" data-slick-index="1" aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide01" style="width: 840px;"><img src="http://dev.novembit.com/rs_card/wp-content/uploads/2016/09/slider.jpg" alt="slide"></div><div class="rsslide slick-slide" data-slick-index="2" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide02" style="width: 840px;"><img src="http://dev.novembit.com/rs_card/wp-content/uploads/2016/09/slider.jpg" alt="slide"></div><div class="rsslide slick-slide slick-cloned" data-slick-index="3" aria-hidden="true" tabindex="-1" style="width: 840px;"><img src="http://dev.novembit.com/rs_card/wp-content/uploads/2016/09/slider.jpg" alt="slide"></div></div></div>


<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button" style="display: block;">Next</button></div>
<h2>Slider</h2>
<div class="slider slider-style2 slick-initialized slick-slider"><button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style="display: block;">Previous</button>
<div aria-live="polite" class="slick-list draggable"><div class="slick-track" role="listbox" style="opacity: 1; width: 4200px; transform: translate3d(-1680px, 0px, 0px);"><div class="rsslide slick-slide slick-cloned" data-slick-index="-1" aria-hidden="true" tabindex="-1" style="width: 840px;"><img src="http://dev.novembit.com/rs_card/wp-content/uploads/2016/09/slider.jpg" alt="slide"></div><div class="rsslide slick-slide" data-slick-index="0" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide10" style="width: 840px;"><img src="http://dev.novembit.com/rs_card/wp-content/uploads/2016/09/slider.jpg" alt="slide"></div><div class="rsslide slick-slide slick-current slick-active" data-slick-index="1" aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide11" style="width: 840px;"><img src="http://dev.novembit.com/rs_card/wp-content/uploads/2016/09/slider.jpg" alt="slide"></div><div class="rsslide slick-slide" data-slick-index="2" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide12" style="width: 840px;"><img src="http://dev.novembit.com/rs_card/wp-content/uploads/2016/09/slider.jpg" alt="slide"></div><div class="rsslide slick-slide slick-cloned" data-slick-index="3" aria-hidden="true" tabindex="-1" style="width: 840px;"><img src="http://dev.novembit.com/rs_card/wp-content/uploads/2016/09/slider.jpg" alt="slide"></div></div></div>


<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button" style="display: block;">Next</button></div>
<h2>Tabs&nbsp;Horizontal</h2>
<div class="tabs tabs-horizontal">
<ul class="tabs-menu">
<li class=""><a href="#11">Tab 1</a></li>
<li class=""><a href="#22">Tab 2</a></li>
<li class=""><a href="#33">Tab 3</a></li>
<li class="active"><a href="#44">Tab 4</a></li>
</ul>
<div class="tabs-content">
<div id="11" class="tab-content" style="display: none;"> Tab 1 content<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. </div>
<div id="22" class="tab-content" style="display: none;"> Tab 2 content<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. </div>
<div id="33" class="tab-content" style="display: none;"> Tab 3 content<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. </div>
<div id="44" class="tab-content active" style="display: block;"> Tab 4 content<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. </div>
<p></p></div>
<p></p></div>
<h2>Tabs&nbsp;Vertical</h2>
<div class="tabs tabs-vertical">
<ul class="tabs-menu">
<li class=""><a href="#51">Tab 1</a></li>
<li class=""><a href="#62">Tab 2</a></li>
<li class=""><a href="#73">Tab 3</a></li>
<li class="active"><a href="#84">Tab 4</a></li>
</ul>
<div class="tabs-content">
<div id="51" class="tab-content" style="display: none;"> Tab 1 content<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. </div>
<div id="62" class="tab-content" style="display: none;"> Tab 2 content<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. </div>
<div id="73" class="tab-content" style="display: none;"> Tab 3 content<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. </div>
<div id="84" class="tab-content active" style="display: block;"> Tab 4 content<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. </div>
<p></p></div>
<p></p></div>
<h2>Toggle</h2>
<ul class="togglebox">
<li class="active">
<h3 class="togglebox-header">Toggle Box Title 1</h3>
<div class="togglebox-content" style="display: block;"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. </div>
</li>
<li>
<h3 class="togglebox-header">Toggle Box Title 2</h3>
<div class="togglebox-content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. </div>
</li>
<li class="active">
<h3 class="togglebox-header">Toggle Box Title 3</h3>
<div class="togglebox-content" style="display: block;"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. </div>
</li>
</ul>
<h2>Accordeon</h2>
<ul class="accordion">
<li class="">
<h3 class="accordion-header">Accordion Box Title 1</h3>
<div class="accordion-content" style="display: none;">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna.<br>
Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit<br>
fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna.<br>
Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit<br>
fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor.
</div>
</li>
<li class="">
<h3 class="accordion-header">Accordion Box Title 2</h3>
<div class="accordion-content" style="display: none;">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna.<br>
Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit<br>
fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna.<br>
Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit<br>
fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor.
</div>
</li>
<li class="active">
<h3 class="accordion-header">Accordion Box Title 3</h3>
<div class="accordion-content" style="display: block;">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna.<br>
Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit<br>
fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna.<br>
Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit<br>
fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor.
</div>
</li>
</ul>
</div>
</div>`
