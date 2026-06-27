'use client';

import {
  Shield,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  User,
  Mail,
  Lock,
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Star,
  Heart,
  Share2,
  Download,
  Upload,
  Plus,
  Minus,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
  Link as LinkIcon,
  Code,
  Zap,
  Moon,
  Sun,
  Bell as BellIcon,
  Home as HomeIcon,
  Send as SendIcon,
} from 'lucide-react';

const iconMap = {
  shield: Shield,
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
  discord: MessageCircle,
  'check-circle': CheckCircle,
  'alert-circle': AlertCircle,
  info: Info,
  settings: Settings,
  user: User,
  mail: Mail,
  lock: Lock,
  search: Search,
  menu: Menu,
  x: X,
  'chevron-down': ChevronDown,
  'arrow-right': ArrowRight,
  star: Star,
  heart: Heart,
  'share-2': Share2,
  download: Download,
  upload: Upload,
  plus: Plus,
  minus: Minus,
  'trash-2': Trash2,
  edit: Edit,
  copy: Copy,
  'external-link': ExternalLink,
  link: LinkIcon,
  code: Code,
  zap: Zap,
  moon: Moon,
  sun: Sun,
  bell: BellIcon,
  home: HomeIcon,
  send: SendIcon,
};

export type IconName = keyof typeof iconMap;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon = ({
  name,
  size = 20,
  color = 'currentColor',
  className = '',
  ...props
}: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      {...props}
    />
  );
};

export const SocialIcon = ({ platform, ...props }: Omit<IconProps, 'name'> & { platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'github' | 'youtube' | 'discord' }) => {
  return <Icon name={platform} {...props} />;
};