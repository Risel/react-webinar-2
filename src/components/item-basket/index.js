import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import {useNavigate, Link} from 'react-router-dom'
import './styles.css';
import useStore from '../../utils/use-store';


function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const navigate = useNavigate()
  const store = useStore()

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    closeModal: useCallback(()=> store.get('modals').close(),[])
  };

  const goToItem = () => {
    navigate(`product/${props.item._id}`);
    callbacks.closeModal();
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
      <span onClick={goToItem} className = {cn('link')}>
        {props.item.title}
      </span>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>Удалить</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);
