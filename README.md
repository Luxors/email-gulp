<p>Русская версия находится в файле README.ru.md.</p>
<h1>Development of e-mail with Gulp</h1>
<h2>Description</h2>
<p>In this repository there is a template for development of e-mail.</p>
<p>The template with Gulp allow to create inline styles and media queries in real time, and also to make autoreload of browser in development process.</p>
<p>In template to use Pug and Sass preprocessors. It is possible to use other preprocessors. For example, Stylus.</p>
<p>Detailed description in <a href="https://webmikorn.ru/articles/verstka-elektronnogo-pisma-s-pomoshhyu-gulp/">article</a> (russian language).</p>
<h2>Requirements</h2>
<ol>
  <li>Node.js.</li>
  <li>Node.js Packet Manager (NPM).</li>
  <li>Gulp.</li>
  <li>Git.</li>
  <li>Git Bash &mdash; for Windows users.</li>
</ol>
<h2>Use the template</h2>
<p>To use the template in your projects, it is necessary to clone it:</p>
<pre>git clone https://github.com/mikorn/email-gulp.git --depth 1 my-email-gulp</pre>
<p>Farther go to the folder:</p>
<pre>cd my-email-gulp</pre>
<p>And to set npm-dependencies:</p>
<pre>npm install</pre>
<p>Or:</p>
<pre>npm i</pre>
<p>The template is ready for development of your e-mail project.</p>
<h2>Development of e-mail with template</h2>
<p>For development in terminal (or Git Bash) need to launch the Gulp:</p>
<pre>gulp</pre>
<p>Edit of the Pug code happens in the file /app/pug/email.pug.</p>
<p>Styles, variables, mixins and media queries are in the folder /app/sass.</p>
<p>In the file app/sass/styles/inline.scss prescribed styles, which with Gulp formatted in inline styles.</p>
<p>In the file app/sass/styles/media.scss &mdash; media queries, which auto formatted in style tags.</p>
