import React from 'react';

import { Button } from 'react-bootstrap';


function Company(props) {
  const {
    data: {
      _id,
      _source: {
        displayName,
        INN,
        KPP,
        fullName,
        OGRN,
        // legalAddress,
        OKVED,
        primaryOKVEDRefId
      },
    },
    isOpen,
    onOpen
  } = props

  if (isOpen) {
    return (
      <div>
        <div>Полное название компании: {fullName}</div>
        <div>ИНН: {INN}</div>
        <div>КПП: {KPP}</div>
        <div>ОГРН: {OGRN}</div>
        {/* {legalAddress.source && <div>Адрес: {legalAddress.source}</div>} */}
        <table border="1">
          <thead>
            <tr>
              <th>primaryOKVEDRefId</th>
              <th>OKVEDRefId</th>
            </tr>
          </thead>
          <tbody>
            {
              OKVED.map(({ OKVEDRefId }, key) => {
                return (
                  <tr key={key}>
                    <th>{primaryOKVEDRefId}</th>
                    <th>{OKVEDRefId}</th>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <Button variant="warning" onClick={() => props.history.push(`/company/${_id}/products`)} type="submit">
          Продукты
        </Button>
        <Button variant="danger" onClick={() => onOpen(_id)} type="submit">
          Закрыть карточку компании
        </Button>
      </div>
    )
  } else {
    return (
      <div>
        <div>Название компании: {displayName}</div>
        <div>ИНН: {INN}</div>
        <Button variant="primary" onClick={() => onOpen(_id)} type="submit">
          Открыть карточку компании
        </Button>
      </div>
    )
  }
}

export default Company;
