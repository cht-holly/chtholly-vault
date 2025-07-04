/**
 * AGENT INSTRUCTION: ItemGrid Component Pattern
 * 
 * This component demonstrates the core grid layout pattern from the original ProfileGrid.
 * It's been generalized to work with any type of items across different industries.
 * 
 * ADAPTATION GUIDE:
 * 1. Replace BaseItem with your industry-specific interface
 * 2. Customize getCategoryInfo() with your categories and colors
 * 3. Adapt the card content structure for your data
 * 4. Modify the multi-step flow component (ItemFlow) for your process
 * 
 * RESPONSIVE BEHAVIOR:
 * - Mobile: Single column grid with full-width cards
 * - Tablet: Two column grid with medium spacing
 * - Desktop: Three column grid with optimal spacing
 * - Touch optimization: Proper touch targets and hover effects
 * 
 * EXAMPLES:
 * - E-commerce: Product grid with images, prices, add-to-cart buttons
 * - Photography: Gallery grid with images, photo counts, booking buttons
 * - Social: Post grid with avatars, content previews, interaction buttons
 * 
 * CSS CLASSES TO MAINTAIN:
 * - grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 (responsive grid)
 * - hover:shadow-lg transition-shadow duration-200 (smooth hover effects)
 * - touch-manipulation (mobile optimization)
 * - min-h-[3rem] (consistent content height)
 */

import { useState } from 'react';
import { BaseItem, BaseFlowData } from '@/types/base';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCategoryInfo } from '@/data/sampleItems';
import { PersonalizationWizard } from './wizard/PersonalizationWizard';

interface ItemCardProps {
  item: BaseItem;
  onSelectItem: (item: BaseItem) => void;
}

const ItemCard = ({ item, onSelectItem }: ItemCardProps) => {
  const handleSelectItem = () => {
    onSelectItem(item);
  };

  const categoryInfo = getCategoryInfo(item.category);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer touch-manipulation flex flex-col h-full" onClick={handleSelectItem}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base sm:text-lg leading-tight">{item.name}</CardTitle>
          <div className="flex gap-1 flex-shrink-0">
            {item.isPopular && (
              <Badge variant="secondary" className="text-xs">Popular</Badge>
            )}
            {item.isFeatured && (
              <Badge variant="outline" className="text-xs">Featured</Badge>
            )}
          </div>
        </div>
        <Badge className={categoryInfo.color}>
          {categoryInfo.icon} {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col flex-grow">
        <CardDescription className="mb-4 text-sm leading-relaxed">
          {item.description}
        </CardDescription>
        
        {/* Core Themes Section */}
        <div className="mb-4 flex-grow">
          <p className="text-sm font-medium mb-2">Key Features:</p>
          <div className="flex flex-wrap gap-1">
            {item.coreThemes.slice(0, 3).map((theme) => (
              <Badge key={theme} variant="outline" className="text-xs">
                {theme}
              </Badge>
            ))}
            {item.coreThemes.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{item.coreThemes.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action Button - Always at bottom */}
        <div className="mt-auto">
          <Button className="w-full" size="sm">
            Select This Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface ItemGridProps {
  items: BaseItem[];
  title?: string;
  showEmpty?: boolean;
  onItemSelect?: (item: BaseItem) => void;
  onFlowComplete?: (item: BaseItem, flowData: BaseFlowData) => void;
}

export const ItemGrid = ({ 
  items, 
  title, 
  showEmpty = true,
  onItemSelect,
  onFlowComplete 
}: ItemGridProps) => {
  const [selectedItem, setSelectedItem] = useState<BaseItem | null>(null);
  const [showFlow, setShowFlow] = useState(false);

  const handleSelectItem = (item: BaseItem) => {
    setSelectedItem(item);
    onItemSelect?.(item);
    
    // For demo purposes, we'll just show a simple alert
    // In a real implementation, you'd open a multi-step flow component here
    setShowFlow(true);
  };

  const handleFlowComplete = (item: BaseItem, flowData: BaseFlowData) => {
    onFlowComplete?.(item, flowData);
    setShowFlow(false);
    setSelectedItem(null);
  };

  const handleFlowClose = () => {
    setShowFlow(false);
    setSelectedItem(null);
  };

  // Empty state
  if (items.length === 0 && showEmpty) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No items found matching your criteria.</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {title && (
        <h2 className="text-xl sm:text-2xl font-semibold text-center px-4">{title}</h2>
      )}
      
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onSelectItem={handleSelectItem} />
        ))}
      </div>
      
      {/* PersonalizationWizard - Complete multi-step flow component */}
      {showFlow && selectedItem && (
        <PersonalizationWizard
          item={selectedItem}
          onComplete={handleFlowComplete}
          onClose={handleFlowClose}
        />
      )}
    </div>
  );
};

/**
 * USAGE EXAMPLES:
 * 
 * Basic usage:
 * <ItemGrid items={sampleItems} title="Featured Items" />
 * 
 * With callbacks:
 * <ItemGrid 
 *   items={filteredItems} 
 *   title="Search Results"
 *   onItemSelect={(item) => console.log('Selected:', item)}
 *   onFlowComplete={(item, flow) => console.log('Completed:', item, flow)}
 * />
 * 
 * Industry-specific examples:
 * 
 * E-commerce:
 * <ItemGrid 
 *   items={products} 
 *   title="Featured Products"
 *   onItemSelect={openProductDetails}
 *   onFlowComplete={addToCart}
 * />
 * 
 * Photography:
 * <ItemGrid 
 *   items={galleries} 
 *   title="Portfolio Galleries"
 *   onItemSelect={openGallery}
 *   onFlowComplete={bookSession}
 * />
 */
