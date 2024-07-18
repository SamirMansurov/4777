

export function task(item, array) {
    const tr_body = document.createElement('tr')
    const no = document.createElement('td')
    const name = document.createElement('td')
    const action = document.createElement('td')
    const btn_edit = document.createElement('button')
    const btn_remove = document.createElement('button')
    const img_edit = document.createElement('img')
    const img_remove = document.createElement('img')
    no.classList.add('td')

    name.classList.add('td')
    action.classList.add('td')
    btn_edit.classList.add('edit_name')
    btn_remove.classList.add('delete_user')
    img_edit.classList.add('img')
    img_remove.classList.add('img')
    no.innerHTML = item.number + 1
    name.innerHTML = item.name
    img_edit.src = 'https://www.svgrepo.com/show/73131/edit-button.svg'
    img_remove.src = 'https://avatars.mds.yandex.net/i?id=be1c0d9e3986ba90c1ab99cf1ae893a5d6842943-3920022-images-thumbs&n=13'

    tr_body.append(no, name, action)
    action.append(btn_edit, btn_remove)
    btn_edit.append(img_edit)
    btn_remove.append(img_remove)

    btn_remove.onclick = () => {
        let idx = array.indexOf(item);
        let tastId = array[idx].id;

        fetch(`http://localhost:8080/todos/${tastId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log('Student deleted:', res);
                array.splice(idx, 1);
                tr_body.remove();
            })

    };
    if (item.complited === true) {
        name.classList.add('complited')
    }
    btn_edit.onclick = () => {

        fetch('http://localhost:8080/todos/' + item.id, {
            method: "PATCH",
            body: JSON.stringify({
                complited: !item.complited
            })
        })
            .then(res => {
                if (item.complited === false) {
                    name.classList.add('complited')
                    item.complited = true
                } else {
                    name.classList.remove('complited')
                    item.complited = false
                }
            })
    }

    return tr_body
}