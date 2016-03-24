# Resume

This is a very simple static (single page) site generator for resumes, along
with a pdf generated from html. The idea is inpired from [Naeem Khedarun](http://www.sharpfellows.com/post/publishing-your-c-v-on-the-web-and-exporting-pdf-with-added-gulp-and-bootstrap)

### Example Links
* [Resume](http://resume.nicolesiegel.me)
* [Generated PDF](http://resume.nicolesiegel.me/nicole_siegel_resume.pdf)

### Build Steps
This project uses gulp, which requires Nodejs to be installed.
* install *wkhtmltopdf* with an OS package manager - Brew, apt-get, etc
* install gulp globally `npm install -g gulp`
* install the node packages in this project `npm install`
* run `gulp build`

This project uses bootswatch - a collection of bootstrap themes. The base css
for a resume can be switched by adding a `--theme` arg to the build command.
For example, `gulp build --theme=journal`, will produce a resume using the
journal bootstrap theme.

### Deployment steps
This project comes ready to deploy to github pages.
* You'll need to point your custom domain to <username>.github.io using a CNAME
entry
* replace domain specified in this repo's CNAME file with yours
* Once satisfied, run `gulp deploy` to deploy to a gh-pages branch
* your resume is published


### Next
* possibly turn this into a markdown only type of thing.
* konami code for something, maybe a hidden game
* remove wkhtmltopdf dependency - maybe with something pure javascript
