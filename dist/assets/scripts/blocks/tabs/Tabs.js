import getInitialAllTabsData from"./allTabsData.js";import allTabsDataNewsPage from"./allTabsDataNewsPage.js";import allTabsDataResourcesPage from"./allTabsDataResourcesPage.js";import getEmptyTabData from"./getEmptyTabData.js";import Posts from"../posts/Posts.js";const initialPostsData={categories:{Home:getInitialAllTabsData(),News:allTabsDataNewsPage(),Resources:allTabsDataResourcesPage()}},rootSelector="[data-js-tabs]",postSelector="[data-js-post]",postsSelector="[data-js-posts]";class Tabs{selectors={root:rootSelector,button:"[data-js-tabs-button]",buttonTitle:"[data-js-tabs-button-title]",postCategory:"[data-js-post-category]"};stateClasses={isActive:"is-active"};stateAttributes={ariaSelected:"aria-selected",tabIndex:"tabindex"};constructor(t,e=[]){this.rootElement=t,this.buttonElements=this.rootElement.querySelectorAll(this.selectors.button),this.buttonTitleElements=this.rootElement.querySelectorAll(this.selectors.buttonTitle),this.state={activeTabIndex:[...this.buttonElements].findIndex((t=>t.classList.contains(this.stateClasses.isActive)))},this.postsCategories=e,this.limitTabsIndex=this.buttonElements.length-1,this.bindEvents()}updateTabContent(t){document.querySelector(postsSelector).remove();const e=this.postsCategories.map((t=>Object.keys(initialPostsData.categories).find((e=>e===t)))),s=initialPostsData.categories[e];this.rootElement.insertAdjacentHTML("afterend",s);const a=this.buttonTitleElements[t].textContent.trim(),o=document.querySelectorAll(postSelector);0===t&&"All"===a||(o.forEach((t=>{t.querySelector(this.selectors.postCategory).dataset.jsPostCategory.trim()!==a&&t?.remove()})),document?.querySelector(".posts__list")?.children?.length||document?.querySelector(".posts__list")?.insertAdjacentHTML("beforeend",getEmptyTabData()))}updateUI(){const{activeTabIndex:t}=this.state;this.buttonElements.forEach(((e,s)=>{const a=s===t,o=this.buttonTitleElements[s];e.classList.toggle(this.stateClasses.isActive,a),o.classList.toggle(this.stateClasses.isActive,a)})),this.updateTabContent(t)}onButtonClick(t){this.state.activeTabIndex=t,this.updateUI(),new Posts}bindEvents(){this.buttonElements.forEach(((t,e)=>{t.addEventListener("click",(()=>this.onButtonClick(e))),t.addEventListener("keydown",(t=>{"Enter"===t.key&&this.onButtonClick(e)}))}))}}class TabsCollection{constructor(t=[]){this.postsCategories=t,this.init()}init(){document.querySelectorAll(rootSelector).forEach((t=>new Tabs(t,this.postsCategories)))}}export default TabsCollection;