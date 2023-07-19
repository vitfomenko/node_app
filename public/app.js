const toCurrency = price => {
    return new Intl.NumberFormat('en-GB', {
                    currency: 'GBP',
                    style: 'currency'
                }).format(price);
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent);
})

const $card = document.querySelector('#card');

if($card) {
    $card.addEventListener('click', e => {
        if(e.target.classList.contains('js-remove')) {
            const id = e.target.dataset.id;
            fetch('/card/remove/' + id, {method: 'delete'})
                .then(res => res.json())
                .then(card => {
                if(card.books.length) {
                    const html = card.books.map(b => {
                        return `
                        <tr>
                            <td>${b.title}</td>
                            <td>${b.count}</td>
                            <td>
                                <button class="btn btn-small js-remove" data-id="${b.id}">Delete</button>
                            </td>
                         </tr>
                        `;
                    }).join('');

                    $card.querySelector('tbody').innerHTML = html;
                    $card.querySelector('.price').textContent = toCurrency(card.price);
                } else {
                    $card.innerHTML = '<p>The card is empty...</p>';
                }
            });
        }
    });
}