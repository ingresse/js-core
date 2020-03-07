/**
 * Core Packages
 */
import {
    styled,
} from '../../css';

/**
 * Values
 */
const className = 'ce';

/**
 * Component Styles
 */
const CodeEditorStyled = styled.div`
    color     : ${({ theme }) => theme.inverse};
    background: ${({ theme }) => theme.get('oil', 'dark')};

    .${className} {
        &__header {
            padding: 5px;

            &__btn {
                display: inline-block;
                margin : 0 4px;
                width  : 12px;
                height : 12px;

                border-radius: 50%;

                background: ${({ theme }) => theme.get(theme.main, 'original', 0.5)};
            }

            &__title {
                color: ${({ theme }) => theme.disabled};
                text-align: center;
                font-size : 14px;
            }
        }

        &__tab {
            display  : inline-block;
            padding  : 5px 10px 4px;
            margin   : 0;
            cursor   : pointer;
            border   : 0;
            outline  : 0;
            min-width: 110px;

            border-top  : 1px solid ${({ theme }) => theme.get('oil')};
            border-right: 1px solid ${({ theme }) => theme.get('oil')};

            font-size  : 12px;
            line-height: 20px;
            text-align : center;

            color     : ${({ theme }) => theme.disabled};
            background: ${({ theme }) => theme.get('oil', 'dark')};

            &.active {
                color     : ${({ theme }) => theme.inverse};
                background: ${({ theme }) => theme.get('oil')};
            }
        }

        &__file {
            padding   : 15px 20px;
            background: ${({ theme }) => theme.get('oil')};
        }
    }
`;

/**
 * Exporting
 */
export {
    className,
    CodeEditorStyled,
};
