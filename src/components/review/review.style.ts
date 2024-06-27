import styled, {css} from 'styled-components';

type TItemLiProps = {
  primary?: boolean | string | undefined;
  color?: string;
  backgroundcolor?: string;
  bordercolor?: string;
  'some-attribute'?: string;
  theme?: {[key: string]: {[key: string]: string}};
}

const ItemLi = styled.li<TItemLiProps>`
  border-radius: 6px;
  border: ${(props) => props.bordercolor || 'transparent'} 1px solid;
  padding: 6px;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.background || 'green'};
  }

  ${(props) => props.primary && css`
    color: ${() => props.color || 'black'};
    background-color: ${() => props.backgroundcolor || 'white'};
  `}
`;

const ItemLiYellow = styled(ItemLi).attrs({'some-attribute': 'value-attribute'})`
  background-color: yellow;
`;

export {ItemLi, ItemLiYellow};
