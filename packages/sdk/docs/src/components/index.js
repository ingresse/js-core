/**
 * Library Components Customization
 */
import {
    Button,
} from '@ingresse/aphrodite';

Button.defaultProps = {
    ...Button.defaultProps,
    radius: '0',
};

export {
    Button,
};

/**
 * Re-exporting Library Components
 */
export {
    /**
     * Grid
     */
    Card,
    Dialog,
    Flex,
    Container,
    Col,
    Row,
    Segment,
    Dropdown,
    List,
    ListItem,

    /**
     * Form
     */
    Input,
    InputMask,
    Select,

    /**
     * Typography
     */
    A,
    H1,
    H2,
    H3,
    Text,

    /**
     * Generics
     */
    Avatar,
    Icon,
    Clipboard,
} from '@ingresse/aphrodite';

/**
 * Project's Components
 */
export * from './CodeExample/CodeExample';
export * from './CodeEditor/CodeEditor';
export * from './CodePreview/CodePreview';
export * from './Content/Content';
export * from './Header/Header';
export * from './Hero/Hero';
export * from './ListItemLink/ListItemLink';
export * from './Logo/Logo';
export * from './Options/Options';
export * from './Section/Section';
export * from './Title/Title';
export * from './Wrapper/Wrapper';

/**
 * Dependent Components
 */
export * from './Router/Router';
