class SearchPage {
    constructor(page) {
        this.page = page;
        this.text=page.getByRole('heading', { name: 'Legal Assistant' });
        this.searchInput = page.getByRole('searchbox', { name: 'Search for legal documents...' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.documentNotMatch = page.getByText('No documents found matching "');
        this.documentMatch = page.getByText('Found 2 relevant legal');
        this.FirstFoundDocument= page.getByRole('heading', { name: 'Data Protection and Privacy' });
        this.SecondFoundDocument= page.getByRole('heading', { name: 'Cybersecurity Framework' });
    }

    async doSearch(input) {
        await this.searchInput.fill(input);
        await this.searchButton.click();
    }
}   
export default SearchPage; 