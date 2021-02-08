const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach(tab =>{
    tab.addEventListener('click', () => {
        let target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent =>{tabContent.classList.remove('active')})
        tabs.forEach(tab =>{tab.classList.remove('active')})
        target.classList.add('active')
        tab.classList.add('active')
    })
});