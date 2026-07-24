<template>
  <section class="customer-profile-page">
    <Transition name="account-toast">
      <div v-if="toast.visible" class="profile-toast" role="status">
        <LucideIcon :name="toast.icon" :size="18" />
        <span>{{ toast.message }}</span>
      </div>
    </Transition>

    <div class="profile-page-frame">
      <header class="profile-page-header">
        <button class="profile-back-link" type="button" @click="$emit('go-shopping')">
          <LucideIcon name="ArrowLeft" :size="18" />
          <span>Continue shopping</span>
        </button>

        <div class="profile-header-actions">
          <button type="button" aria-label="Notifications" @click="showToast('You are all caught up.', 'Bell')">
            <LucideIcon name="Bell" :size="19" />
            <span class="profile-notification-dot"></span>
          </button>
          <button type="button" aria-label="Open cart" @click="$emit('open-cart')">
            <LucideIcon name="ShoppingBag" :size="19" />
            <span class="profile-cart-count">{{ cartCount }}</span>
          </button>
        </div>
      </header>

      <div class="profile-layout">
        <aside class="profile-sidebar">
          <div class="profile-identity-card">
            <div class="profile-avatar-wrap">
              <div class="profile-avatar">{{ initials }}</div>
              <button type="button" aria-label="Change profile image" @click="showToast('Profile photo upload can be connected to your backend.', 'Camera')">
                <LucideIcon name="Camera" :size="15" />
              </button>
            </div>
            <div class="profile-identity-copy">
              <span>My account</span>
              <h2>{{ profile.firstName }} {{ profile.lastName }}</h2>
              <p>{{ profile.email }}</p>
            </div>
            <div class="profile-member-chip">
              <LucideIcon name="Sparkles" :size="15" />
              Gold member
            </div>
          </div>

          <nav class="profile-nav" aria-label="Customer account navigation">
            <button
              v-for="item in navigation"
              :key="item.id"
              type="button"
              :class="{ active: activeSection === item.id }"
              @click="selectSection(item.id)"
            >
              <span class="profile-nav-icon"><LucideIcon :name="item.icon" :size="19" /></span>
              <span class="profile-nav-label">{{ item.label }}</span>
              <span v-if="item.badge" class="profile-nav-badge">{{ item.badge }}</span>
              <LucideIcon v-else name="ChevronRight" :size="16" class="profile-nav-arrow" />
            </button>
          </nav>

          <button class="profile-support-shortcut" type="button" @click="selectSection('support')">
            <span><LucideIcon name="Headphones" :size="20" /></span>
            <div>
              <strong>Need help?</strong>
              <small>Talk to our support team</small>
            </div>
            <LucideIcon name="ArrowUpRight" :size="17" />
          </button>

          <button class="profile-signout" type="button" @click="showToast('You have been signed out of this demo account.', 'LogOut')">
            <LucideIcon name="LogOut" :size="18" />
            Sign out
          </button>
        </aside>

        <main class="profile-main">
          <section v-if="activeSection === 'overview'" class="profile-section">
            <div class="profile-welcome-card">
              <div class="profile-welcome-copy">
                <span class="profile-eyebrow">Account overview</span>
                <h1>{{ greeting }}, {{ profile.firstName }}</h1>
                <p>Track your purchases, manage saved details and continue shopping without unnecessary steps.</p>
                <div class="profile-welcome-actions">
                  <button class="profile-button primary" type="button" @click="selectSection('orders')">
                    View orders
                    <LucideIcon name="ArrowRight" :size="17" />
                  </button>
                  <button class="profile-button secondary" type="button" @click="selectSection('details')">Edit profile</button>
                </div>
              </div>

              <div class="profile-completion">
                <div class="profile-completion-top">
                  <span><LucideIcon name="UserRoundCheck" :size="19" /></span>
                  <strong>Profile strength</strong>
                  <b>{{ profileCompletion }}%</b>
                </div>
                <div class="profile-completion-bar"><span :style="{ width: `${profileCompletion}%` }"></span></div>
                <p>Add a delivery address and keep your contact number updated for faster checkout.</p>
              </div>
            </div>

            <div class="profile-stat-grid">
              <button type="button" @click="selectSection('orders')">
                <span class="profile-stat-icon blue"><LucideIcon name="Package" :size="21" /></span>
                <div><small>Total orders</small><strong>{{ orders.length }}</strong><em>{{ activeOrders }} active now</em></div>
                <LucideIcon name="ArrowUpRight" :size="17" />
              </button>
              <button type="button" @click="selectSection('wishlist')">
                <span class="profile-stat-icon red"><LucideIcon name="Heart" :size="21" /></span>
                <div><small>Saved products</small><strong>{{ displayWishlist.length }}</strong><em>Ready when you are</em></div>
                <LucideIcon name="ArrowUpRight" :size="17" />
              </button>
              <button type="button" @click="selectSection('addresses')">
                <span class="profile-stat-icon green"><LucideIcon name="MapPin" :size="21" /></span>
                <div><small>Saved addresses</small><strong>{{ addresses.length }}</strong><em>{{ defaultAddress.label }} is default</em></div>
                <LucideIcon name="ArrowUpRight" :size="17" />
              </button>
              <button type="button" @click="selectSection('rewards')">
                <span class="profile-stat-icon gold"><LucideIcon name="Coins" :size="21" /></span>
                <div><small>Reward points</small><strong>{{ loyaltyPoints.toLocaleString() }}</strong><em>{{ pointsToNext.toLocaleString() }} to Platinum</em></div>
                <LucideIcon name="ArrowUpRight" :size="17" />
              </button>
            </div>

            <div class="profile-overview-grid">
              <article class="profile-card profile-active-order">
                <div class="profile-card-heading">
                  <div>
                    <span class="profile-eyebrow">Latest purchase</span>
                    <h2>Track your order</h2>
                  </div>
                  <button type="button" @click="selectSection('orders')">View all</button>
                </div>

                <div class="profile-order-product">
                  <img :src="orders[0].items[0].image" :alt="orders[0].items[0].title" />
                  <div>
                    <span>{{ orders[0].id }}</span>
                    <h3>{{ orders[0].items[0].title }}</h3>
                    <p>{{ formatPrice(orders[0].total) }} · {{ orders[0].items.length }} items</p>
                  </div>
                  <span class="profile-status in-transit"><LucideIcon name="Truck" :size="15" />{{ orders[0].status }}</span>
                </div>

                <div class="profile-order-progress">
                  <div class="profile-order-progress-line"><span :style="{ width: `${orders[0].progress}%` }"></span></div>
                  <div class="profile-progress-labels">
                    <span>Confirmed</span>
                    <span>Packed</span>
                    <span>In transit</span>
                    <span>Delivered</span>
                  </div>
                </div>

                <div class="profile-order-footer">
                  <p><LucideIcon name="CalendarClock" :size="17" /> Estimated arrival <strong>{{ orders[0].eta }}</strong></p>
                  <button class="profile-button primary compact" type="button" @click="openOrder(orders[0].id)">Track order</button>
                </div>
              </article>

              <article class="profile-card profile-quick-actions">
                <div class="profile-card-heading">
                  <div>
                    <span class="profile-eyebrow">Shortcuts</span>
                    <h2>Manage your account</h2>
                  </div>
                </div>
                <div class="profile-action-list">
                  <button v-for="action in quickActions" :key="action.target" type="button" @click="selectSection(action.target)">
                    <span><LucideIcon :name="action.icon" :size="19" /></span>
                    <div><strong>{{ action.title }}</strong><small>{{ action.text }}</small></div>
                    <LucideIcon name="ChevronRight" :size="17" />
                  </button>
                </div>
              </article>
            </div>

            <div class="profile-insight-grid">
              <article class="profile-rewards-preview">
                <div class="profile-rewards-preview-top">
                  <span><LucideIcon name="Award" :size="21" /></span>
                  <div>
                    <small>Zappy Rewards</small>
                    <h2>Gold membership</h2>
                  </div>
                  <button type="button" @click="selectSection('rewards')">View rewards <LucideIcon name="ArrowUpRight" :size="16" /></button>
                </div>
                <div class="profile-rewards-balance">
                  <strong>{{ loyaltyPoints.toLocaleString() }}</strong>
                  <span>available points</span>
                </div>
                <div class="profile-tier-progress">
                  <div><span>Gold</span><strong>{{ Math.round((loyaltyPoints / tierTarget) * 100) }}%</strong><span>Platinum</span></div>
                  <div class="profile-tier-track"><span :style="{ width: `${Math.min(100, (loyaltyPoints / tierTarget) * 100)}%` }"></span></div>
                  <p>Spend or review purchases to unlock free-delivery and member-only offers.</p>
                </div>
              </article>

              <article class="profile-card profile-activity-card">
                <div class="profile-card-heading">
                  <div><span class="profile-eyebrow">Recent activity</span><h2>Your account timeline</h2></div>
                </div>
                <div class="profile-activity-list">
                  <div v-for="activity in recentActivity" :key="activity.title">
                    <span><LucideIcon :name="activity.icon" :size="17" /></span>
                    <div><strong>{{ activity.title }}</strong><small>{{ activity.text }}</small></div>
                    <time>{{ activity.time }}</time>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section v-else-if="activeSection === 'orders'" class="profile-section">
            <ProfileHeading eyebrow="Purchase history" title="My orders" description="Track current orders and revisit completed purchases.">
              <template #action>
                <button class="profile-button secondary" type="button" @click="$emit('go-shopping')">
                  <LucideIcon name="Plus" :size="17" /> New order
                </button>
              </template>
            </ProfileHeading>

            <div class="profile-order-metrics">
              <button type="button" @click="orderFilter = 'Processing'">
                <span><LucideIcon name="Package" :size="19" /></span>
                <div><small>Active orders</small><strong>{{ activeOrders }}</strong></div>
              </button>
              <button type="button" @click="orderFilter = 'Delivered'">
                <span><LucideIcon name="Check" :size="19" /></span>
                <div><small>Delivered</small><strong>{{ deliveredOrders }}</strong></div>
              </button>
              <div>
                <span><LucideIcon name="ReceiptText" :size="19" /></span>
                <div><small>Total spent</small><strong>{{ formatPrice(orderSpend) }}</strong></div>
              </div>
              <button type="button" @click="showToast('You currently have no open return requests.', 'RotateCcw')">
                <span><LucideIcon name="RotateCcw" :size="19" /></span>
                <div><small>Open returns</small><strong>0</strong></div>
              </button>
            </div>

            <div class="profile-toolbar">
              <label class="profile-search">
                <LucideIcon name="Search" :size="18" />
                <input v-model="orderSearch" type="search" placeholder="Search order or product" />
              </label>
              <div class="profile-filter-tabs">
                <button v-for="filter in orderFilters" :key="filter" type="button" :class="{ active: orderFilter === filter }" @click="orderFilter = filter">{{ filter }}</button>
              </div>
            </div>

            <div class="profile-order-list">
              <article v-for="order in filteredOrders" :key="order.id" class="profile-order-card">
                <header>
                  <div><span>Order</span><strong>{{ order.id }}</strong></div>
                  <div><span>Placed</span><strong>{{ order.date }}</strong></div>
                  <div><span>Total</span><strong>{{ formatPrice(order.total) }}</strong></div>
                  <span class="profile-status" :class="statusClass(order.status)">{{ order.status }}</span>
                  <button type="button" aria-label="More order options" @click="expandedOrder = expandedOrder === order.id ? '' : order.id">
                    <LucideIcon name="MoreHorizontal" :size="20" />
                  </button>
                </header>

                <div class="profile-order-body">
                  <div class="profile-order-images">
                    <img v-for="item in order.items.slice(0, 3)" :key="item.title" :src="item.image" :alt="item.title" />
                  </div>
                  <div class="profile-order-summary">
                    <h3>{{ order.items[0].title }}</h3>
                    <p>{{ order.items.length > 1 ? `and ${order.items.length - 1} more item` : order.items[0].category }}</p>
                  </div>
                  <div class="profile-order-actions">
                    <button class="profile-button secondary compact" type="button" @click="downloadInvoice(order)">
                      <LucideIcon name="Download" :size="16" /> Invoice
                    </button>
                    <button class="profile-button primary compact" type="button" @click="openOrder(order.id)">View order</button>
                  </div>
                </div>

                <div v-if="expandedOrder === order.id" class="profile-order-expanded">
                  <div v-for="item in order.items" :key="item.title">
                    <img :src="item.image" :alt="item.title" />
                    <span><strong>{{ item.title }}</strong><small>Qty {{ item.quantity }} · {{ formatPrice(item.price) }}</small></span>
                    <button type="button" @click="buyAgain(item)"><LucideIcon name="RotateCcw" :size="16" /> Buy again</button>
                  </div>
                </div>
              </article>

              <div v-if="!filteredOrders.length" class="profile-empty-state">
                <LucideIcon name="PackageSearch" :size="34" />
                <h3>No matching orders</h3>
                <p>Try another keyword or order status.</p>
              </div>
            </div>
          </section>

          <section v-else-if="activeSection === 'wishlist'" class="profile-section">
            <ProfileHeading eyebrow="Saved for later" title="My wishlist" description="Keep products you are considering in one clean place." />

            <div v-if="displayWishlist.length" class="profile-wishlist-grid">
              <article v-for="item in displayWishlist" :key="item.title" class="profile-wishlist-card">
                <button class="profile-wishlist-remove" type="button" aria-label="Remove from wishlist" @click="removeWishlist(item)">
                  <LucideIcon name="X" :size="16" />
                </button>
                <button class="profile-wishlist-image" type="button" @click="$emit('view-product', item)">
                  <img :src="item.img || item.image" :alt="item.title" />
                </button>
                <span>{{ item.category || 'Featured product' }}</span>
                <h3>{{ item.title }}</h3>
                <div class="profile-wishlist-price">
                  <strong>{{ formatPrice(item.price) }}</strong>
                  <del v-if="item.old || item.oldPrice">{{ formatPrice(item.old || item.oldPrice) }}</del>
                </div>
                <button class="profile-button primary full" type="button" @click="addWishlistToCart(item)">
                  <LucideIcon name="ShoppingBag" :size="17" /> Add to cart
                </button>
              </article>
            </div>

            <div v-else class="profile-empty-state large">
              <LucideIcon name="Heart" :size="38" />
              <h3>Your wishlist is empty</h3>
              <p>Save products you like and return to them from here.</p>
              <button class="profile-button primary" type="button" @click="$emit('go-shopping')">Explore products</button>
            </div>
          </section>

          <section v-else-if="activeSection === 'rewards'" class="profile-section">
            <ProfileHeading eyebrow="Member benefits" title="Rewards & wallet" description="Use points, vouchers and account credit to get more value from every order." />

            <article class="profile-reward-hero">
              <div class="profile-reward-hero-copy">
                <span class="profile-reward-level"><LucideIcon name="Award" :size="17" /> Gold member</span>
                <h2>Hi Dinura, your rewards are ready.</h2>
                <p>Earn points from purchases, product reviews and referrals. Your available rewards are automatically shown at checkout.</p>
                <div class="profile-reward-numbers">
                  <div><strong>{{ loyaltyPoints.toLocaleString() }}</strong><span>Available points</span></div>
                  <div><strong>{{ formatPrice(walletBalance) }}</strong><span>Store credit</span></div>
                  <div><strong>{{ vouchers.length }}</strong><span>Active vouchers</span></div>
                </div>
              </div>
              <div class="profile-reward-tier-card">
                <span>Next level</span>
                <h3>Platinum</h3>
                <strong>{{ pointsToNext.toLocaleString() }} points to go</strong>
                <div><span :style="{ width: `${Math.min(100, (loyaltyPoints / tierTarget) * 100)}%` }"></span></div>
                <small>Platinum includes priority support and selected free-delivery benefits.</small>
              </div>
            </article>

            <div class="profile-reward-benefits">
              <article><span><LucideIcon name="Truck" :size="20" /></span><div><strong>Member delivery offers</strong><small>Selected delivery discounts are applied automatically.</small></div></article>
              <article><span><LucideIcon name="Gift" :size="20" /></span><div><strong>Birthday reward</strong><small>A personal voucher is reserved for your birthday month.</small></div></article>
              <article><span><LucideIcon name="Headphones" :size="20" /></span><div><strong>Priority assistance</strong><small>Get faster support for active orders and returns.</small></div></article>
            </div>

            <div class="profile-voucher-section">
              <div class="profile-card-heading">
                <div><span class="profile-eyebrow">Available now</span><h2>Your vouchers</h2></div>
              </div>
              <div class="profile-voucher-grid">
                <article v-for="voucher in vouchers" :key="voucher.code" class="profile-voucher-card">
                  <span><LucideIcon name="TicketPercent" :size="22" /></span>
                  <div><small>{{ voucher.label }}</small><h3>{{ voucher.value }}</h3><p>{{ voucher.description }}</p></div>
                  <div><code>{{ voucher.code }}</code><button type="button" @click="redeemVoucher(voucher)">Use voucher</button></div>
                </article>
              </div>
            </div>

            <article class="profile-card profile-referral-card">
              <span><LucideIcon name="Users" :size="23" /></span>
              <div><span class="profile-eyebrow">Invite friends</span><h2>Give Rs. 500, get Rs. 500</h2><p>Share your referral code. Credit is added after your friend completes their first eligible order.</p></div>
              <div><code>{{ referralCode }}</code><button class="profile-button secondary compact" type="button" @click="copyReferral"><LucideIcon name="Copy" :size="16" /> Copy code</button></div>
            </article>
          </section>

          <section v-else-if="activeSection === 'details'" class="profile-section">
            <ProfileHeading eyebrow="Personal information" title="Profile details" description="Keep your details accurate for smooth communication and checkout." />

            <form class="profile-card profile-form-card" @submit.prevent="saveProfile">
              <div class="profile-form-heading">
                <span><LucideIcon name="UserRound" :size="21" /></span>
                <div><h2>Basic information</h2><p>Used for orders, invoices and delivery updates.</p></div>
              </div>

              <div class="profile-form-grid">
                <label><span>First name</span><input v-model="profile.firstName" required /></label>
                <label><span>Last name</span><input v-model="profile.lastName" required /></label>
                <label><span>Email address</span><input v-model="profile.email" type="email" required /></label>
                <label><span>Mobile number</span><input v-model="profile.phone" type="tel" required /></label>
                <label><span>Preferred language</span><select v-model="profile.language"><option>English</option><option>Sinhala</option><option>Tamil</option></select></label>
                <label><span>Preferred fulfilment</span><select v-model="profile.fulfilment"><option>Home delivery</option><option>Store pickup</option></select></label>
                <label><span>Date of birth</span><input v-model="profile.dateOfBirth" type="date" /></label>
                <label><span>Preferred contact</span><select v-model="profile.preferredContact"><option>Email</option><option>SMS</option><option>WhatsApp</option></select></label>
              </div>

              <div class="profile-form-actions">
                <button class="profile-button primary" type="submit"><LucideIcon name="Save" :size="17" /> Save changes</button>
              </div>
            </form>

            <article class="profile-card profile-preference-card">
              <div class="profile-form-heading">
                <span><LucideIcon name="BellRing" :size="21" /></span>
                <div><h2>Communication preferences</h2><p>Choose which updates are useful to you. Essential order messages always remain enabled.</p></div>
              </div>
              <div class="profile-preference-list">
                <label>
                  <span><LucideIcon name="Truck" :size="19" /></span>
                  <div><strong>Order and delivery updates</strong><small>Confirmation, dispatch, pickup and delivery alerts.</small></div>
                  <span class="profile-toggle locked"><input type="checkbox" checked disabled /><span></span></span>
                </label>
                <label>
                  <span><LucideIcon name="TicketPercent" :size="19" /></span>
                  <div><strong>Offers and price drops</strong><small>Relevant promotions, wishlist reductions and member vouchers.</small></div>
                  <span class="profile-toggle"><input v-model="preferences.offers" type="checkbox" /><span></span></span>
                </label>
                <label>
                  <span><LucideIcon name="MessageCircleMore" :size="19" /></span>
                  <div><strong>WhatsApp updates</strong><small>Receive selected delivery and customer-care notifications.</small></div>
                  <span class="profile-toggle"><input v-model="preferences.whatsapp" type="checkbox" /><span></span></span>
                </label>
                <label>
                  <span><LucideIcon name="Sparkles" :size="19" /></span>
                  <div><strong>Personal recommendations</strong><small>Suggestions based on wishlist and purchase history.</small></div>
                  <span class="profile-toggle"><input v-model="preferences.recommendations" type="checkbox" /><span></span></span>
                </label>
              </div>
              <div class="profile-form-actions"><button class="profile-button secondary" type="button" @click="savePreferences"><LucideIcon name="Save" :size="17" /> Save preferences</button></div>
            </article>
          </section>

          <section v-else-if="activeSection === 'addresses'" class="profile-section">
            <ProfileHeading eyebrow="Delivery details" title="Saved addresses" description="Manage the places you use most often at checkout.">
              <template #action><button class="profile-button primary" type="button" @click="showAddressForm = !showAddressForm"><LucideIcon name="Plus" :size="17" /> Add address</button></template>
            </ProfileHeading>

            <div class="profile-address-grid">
              <article v-for="address in addresses" :key="address.id" class="profile-address-card" :class="{ default: address.isDefault }">
                <div class="profile-address-card-top">
                  <span><LucideIcon :name="address.label === 'Office' ? 'Building2' : 'House'" :size="21" /></span>
                  <div><h3>{{ address.label }}</h3><small v-if="address.isDefault">Default address</small></div>
                  <button type="button" aria-label="Edit address" @click="editAddress(address)"><LucideIcon name="Pencil" :size="17" /></button>
                </div>
                <strong>{{ address.recipient }}</strong>
                <p>{{ address.line1 }}, {{ address.city }}, {{ address.district }} {{ address.postalCode }}</p>
                <small>{{ address.phone }}</small>
                <div class="profile-address-actions">
                  <button v-if="!address.isDefault" type="button" @click="setDefaultAddress(address.id)">Set as default</button>
                  <button v-if="addresses.length > 1" type="button" class="danger" @click="removeAddress(address.id)">Remove</button>
                </div>
              </article>
            </div>

            <form v-if="showAddressForm" class="profile-card profile-form-card compact-form" @submit.prevent="saveAddress">
              <div class="profile-form-heading">
                <span><LucideIcon name="MapPinned" :size="21" /></span>
                <div><h2>{{ editingAddressId ? 'Edit address' : 'Add a new address' }}</h2><p>Enter accurate information for delivery calculations.</p></div>
                <button type="button" class="profile-form-close" @click="resetAddressForm"><LucideIcon name="X" :size="18" /></button>
              </div>
              <div class="profile-form-grid">
                <label><span>Label</span><select v-model="addressForm.label" required><option value="">Select</option><option>Home</option><option>Office</option><option>Other</option></select></label>
                <label><span>Recipient name</span><input v-model="addressForm.recipient" required /></label>
                <label class="wide"><span>Address</span><input v-model="addressForm.line1" required /></label>
                <label><span>City</span><input v-model="addressForm.city" required /></label>
                <label><span>District</span><input v-model="addressForm.district" required /></label>
                <label><span>Postal code</span><input v-model="addressForm.postalCode" /></label>
                <label><span>Phone</span><input v-model="addressForm.phone" required /></label>
              </div>
              <label class="profile-check"><input v-model="addressForm.isDefault" type="checkbox" /><span>Use as default address</span></label>
              <div class="profile-form-actions"><button class="profile-button primary" type="submit">Save address</button></div>
            </form>
          </section>

          <section v-else-if="activeSection === 'payments'" class="profile-section">
            <ProfileHeading eyebrow="Checkout preferences" title="Payment methods" description="View saved payment methods and available checkout options." />

            <div class="profile-payment-grid">
              <article v-for="method in paymentMethods" :key="method.id" class="profile-payment-card" :class="method.type">
                <div class="profile-payment-card-top">
                  <span class="profile-payment-brand">{{ method.brand }}</span>
                  <span v-if="method.isDefault" class="profile-default-chip"><LucideIcon name="Check" :size="13" /> Default</span>
                </div>
                <strong>{{ method.number }}</strong>
                <div><span>{{ method.holder }}</span><span>{{ method.expiry }}</span></div>
                <button type="button" @click="showToast('Payment method management can be connected to your payment gateway.', 'CreditCard')"><LucideIcon name="MoreHorizontal" :size="19" /></button>
              </article>

              <button class="profile-add-payment" type="button" @click="showToast('Secure card tokenisation should be handled by your payment gateway.', 'CreditCard')">
                <span><LucideIcon name="Plus" :size="20" /></span>
                <strong>Add payment method</strong>
                <small>Visa or Mastercard</small>
              </button>
            </div>

            <article class="profile-card profile-pay-later-card">
              <div class="profile-card-heading">
                <div><span class="profile-eyebrow">More ways to pay</span><h2>Flexible checkout</h2></div>
              </div>
              <div class="profile-pay-options">
                <div><span>KOKO</span><p>Split eligible purchases into instalments.</p></div>
                <div><span>Mintpay</span><p>Pay later using your connected Mintpay account.</p></div>
                <div><LucideIcon name="Banknote" :size="23" /><p>Cash on delivery where available.</p></div>
              </div>
            </article>
          </section>

          <section v-else-if="activeSection === 'security'" class="profile-section">
            <ProfileHeading eyebrow="Account protection" title="Login & security" description="Keep your password and account access under control." />

            <div class="profile-security-grid">
              <article class="profile-card profile-security-card">
                <span class="profile-security-icon"><LucideIcon name="KeyRound" :size="23" /></span>
                <div><h2>Password</h2><p>Last changed 4 months ago.</p></div>
                <button class="profile-button secondary compact" type="button" @click="showPasswordForm = !showPasswordForm">Change</button>

                <form v-if="showPasswordForm" class="profile-password-form" @submit.prevent="savePassword">
                  <label><span>Current password</span><input v-model="passwordForm.current" type="password" required /></label>
                  <label><span>New password</span><input v-model="passwordForm.next" type="password" minlength="8" required /></label>
                  <label><span>Confirm password</span><input v-model="passwordForm.confirm" type="password" minlength="8" required /></label>
                  <button class="profile-button primary" type="submit">Update password</button>
                </form>
              </article>

              <article class="profile-card profile-security-card">
                <span class="profile-security-icon"><LucideIcon name="ShieldCheck" :size="23" /></span>
                <div><h2>Two-step verification</h2><p>Add an extra confirmation step when signing in.</p></div>
                <label class="profile-toggle"><input v-model="twoFactorEnabled" type="checkbox" @change="showToast(twoFactorEnabled ? 'Two-step verification enabled.' : 'Two-step verification disabled.', 'ShieldCheck')" /><span></span></label>
              </article>
            </div>

            <article class="profile-card profile-sessions-card">
              <div class="profile-card-heading"><div><span class="profile-eyebrow">Active access</span><h2>Your devices</h2></div></div>
              <div class="profile-session-row" v-for="session in sessions" :key="session.device">
                <span><LucideIcon :name="session.icon" :size="21" /></span>
                <div><strong>{{ session.device }}</strong><small>{{ session.location }} · {{ session.lastActive }}</small></div>
                <span v-if="session.current" class="profile-current-session">Current</span>
                <button v-else type="button" @click="showToast('The selected session has been signed out.', 'LogOut')">Sign out</button>
              </div>
            </article>
          </section>

          <section v-else class="profile-section">
            <ProfileHeading eyebrow="Customer care" title="Help & support" description="Choose the fastest way to get help with an order or product." />

            <div class="profile-support-grid">
              <button type="button" @click="showToast('Live chat can be connected to your preferred support service.', 'MessageCircle')">
                <span><LucideIcon name="MessageCircle" :size="22" /></span><strong>Live chat</strong><small>Usually replies in minutes</small><LucideIcon name="ArrowUpRight" :size="17" />
              </button>
              <a :href="whatsappLink" target="_blank" rel="noopener noreferrer">
                <span class="whatsapp"><LucideIcon name="MessageCircleMore" :size="22" /></span><strong>WhatsApp</strong><small>Quick product and order help</small><LucideIcon name="ArrowUpRight" :size="17" />
              </a>
              <a href="tel:+94771234567">
                <span><LucideIcon name="Phone" :size="22" /></span><strong>Call support</strong><small>Mon–Sat, 8:30 AM–7:00 PM</small><LucideIcon name="ArrowUpRight" :size="17" />
              </a>
            </div>

            <form class="profile-card profile-support-form" @submit.prevent="submitSupport">
              <div class="profile-form-heading">
                <span><LucideIcon name="Send" :size="21" /></span>
                <div><h2>Send a support request</h2><p>Tell us what happened and include an order number when relevant.</p></div>
              </div>
              <div class="profile-form-grid">
                <label><span>Topic</span><select v-model="supportForm.topic" required><option value="">Select a topic</option><option>Order status</option><option>Delivery issue</option><option>Return or refund</option><option>Product question</option><option>Account help</option></select></label>
                <label><span>Order number</span><input v-model="supportForm.orderId" placeholder="Optional" /></label>
                <label class="wide"><span>Message</span><textarea v-model="supportForm.message" rows="5" required placeholder="Describe how we can help"></textarea></label>
              </div>
              <div class="profile-form-actions"><button class="profile-button primary" type="submit"><LucideIcon name="Send" :size="17" /> Send request</button></div>
            </form>

            <article class="profile-card profile-faq-card">
              <div class="profile-card-heading"><div><span class="profile-eyebrow">Quick answers</span><h2>Frequently asked questions</h2></div></div>
              <div class="profile-faq-list">
                <details v-for="faq in faqs" :key="faq.question">
                  <summary>{{ faq.question }}<LucideIcon name="ChevronRight" :size="17" /></summary>
                  <p>{{ faq.answer }}</p>
                </details>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, defineComponent, h, reactive, ref } from 'vue'
import productImage1 from '@/assets/product-1.webp'
import productImage2 from '@/assets/product-2.webp'
import productImage3 from '@/assets/product-3.webp'
import productImage4 from '@/assets/product-4.webp'
import '@/styles/profile.css'

const props = defineProps({
  wishlistItems: { type: Array, default: () => [] },
  cartItems: { type: Array, default: () => [] },
})

const emit = defineEmits(['go-shopping', 'open-cart', 'view-product', 'add-to-cart', 'remove-wishlist'])

const iconShapes = {
  ArrowLeft: [['path', { d: 'm12 19-7-7 7-7' }], ['path', { d: 'M19 12H5' }]],
  ArrowRight: [['path', { d: 'M5 12h14' }], ['path', { d: 'm12 5 7 7-7 7' }]],
  ArrowUpRight: [['path', { d: 'M7 17 17 7' }], ['path', { d: 'M7 7h10v10' }]],
  Bell: [['path', { d: 'M10.268 21a2 2 0 0 0 3.464 0' }], ['path', { d: 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326' }]],
  ShoppingBag: [['path', { d: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z' }], ['path', { d: 'M3 6h18' }], ['path', { d: 'M16 10a4 4 0 0 1-8 0' }]],
  Camera: [['path', { d: 'M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z' }], ['circle', { cx: '12', cy: '13', r: '3' }]],
  Sparkles: [['path', { d: 'm12 3-1.9 4.8a2 2 0 0 1-1.13 1.13L4 11l4.9 1.9a2 2 0 0 1 1.13 1.13L12 19l1.9-4.9a2 2 0 0 1 1.13-1.13L20 11l-4.9-1.9a2 2 0 0 1-1.13-1.13Z' }], ['path', { d: 'M5 3v4' }], ['path', { d: 'M3 5h4' }]],
  LayoutDashboard: [['rect', { x: '3', y: '3', width: '7', height: '9', rx: '1' }], ['rect', { x: '14', y: '3', width: '7', height: '5', rx: '1' }], ['rect', { x: '14', y: '12', width: '7', height: '9', rx: '1' }], ['rect', { x: '3', y: '16', width: '7', height: '5', rx: '1' }]],
  Package: [['path', { d: 'm7.5 4.27 9 5.15' }], ['path', { d: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' }], ['path', { d: 'm3.3 7 8.7 5 8.7-5' }], ['path', { d: 'M12 22V12' }]],
  Heart: [['path', { d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z' }]],
  UserRound: [['circle', { cx: '12', cy: '8', r: '5' }], ['path', { d: 'M20 21a8 8 0 0 0-16 0' }]],
  UserRoundCheck: [['path', { d: 'M2 21a8 8 0 0 1 13.292-6' }], ['circle', { cx: '10', cy: '8', r: '5' }], ['path', { d: 'm16 19 2 2 4-4' }]],
  MapPin: [['path', { d: 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z' }], ['circle', { cx: '12', cy: '10', r: '3' }]],
  CreditCard: [['rect', { width: '20', height: '14', x: '2', y: '5', rx: '2' }], ['path', { d: 'M2 10h20' }]],
  ShieldCheck: [['path', { d: 'M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z' }], ['path', { d: 'm9 12 2 2 4-4' }]],
  Headphones: [['path', { d: 'M4 14a8 8 0 0 1 16 0' }], ['path', { d: 'M18 19c0 1.7-1.3 3-3 3h-1' }], ['path', { d: 'M4 14v3a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2Z' }], ['path', { d: 'M20 14v3a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z' }]],
  ChevronRight: [['path', { d: 'm9 18 6-6-6-6' }]],
  LogOut: [['path', { d: 'M10 17l5-5-5-5' }], ['path', { d: 'M15 12H3' }], ['path', { d: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' }]],
  Truck: [['path', { d: 'M10 17h4V5H2v12h3' }], ['path', { d: 'M14 9h4l4 4v4h-3' }], ['circle', { cx: '7.5', cy: '17.5', r: '2.5' }], ['circle', { cx: '16.5', cy: '17.5', r: '2.5' }]],
  CalendarClock: [['path', { d: 'M16 2v4' }], ['path', { d: 'M8 2v4' }], ['path', { d: 'M3 10h10' }], ['path', { d: 'M3 4h14a2 2 0 0 1 2 2v5' }], ['path', { d: 'M3 4v16a2 2 0 0 0 2 2h7' }], ['circle', { cx: '18', cy: '18', r: '4' }], ['path', { d: 'M18 16.5V18l1 1' }]],
  Search: [['circle', { cx: '11', cy: '11', r: '8' }], ['path', { d: 'm21 21-4.3-4.3' }]],
  MoreHorizontal: [['circle', { cx: '12', cy: '12', r: '1' }], ['circle', { cx: '19', cy: '12', r: '1' }], ['circle', { cx: '5', cy: '12', r: '1' }]],
  Download: [['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }], ['polyline', { points: '7 10 12 15 17 10' }], ['line', { x1: '12', x2: '12', y1: '15', y2: '3' }]],
  RotateCcw: [['path', { d: 'M3 12a9 9 0 1 0 3-6.7L3 8' }], ['path', { d: 'M3 3v5h5' }]],
  Plus: [['path', { d: 'M5 12h14' }], ['path', { d: 'M12 5v14' }]],
  PackageSearch: [['path', { d: 'm7.5 4.27 9 5.15' }], ['path', { d: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14' }], ['path', { d: 'm3.3 7 8.7 5 8.7-5' }], ['path', { d: 'M12 22V12' }], ['circle', { cx: '18.5', cy: '15.5', r: '2.5' }], ['path', { d: 'm20.3 17.3 1.7 1.7' }]],
  X: [['path', { d: 'M18 6 6 18' }], ['path', { d: 'm6 6 12 12' }]],
  Save: [['path', { d: 'M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z' }], ['path', { d: 'M17 21v-8H7v8' }], ['path', { d: 'M7 3v5h8' }]],
  Building2: [['path', { d: 'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z' }], ['path', { d: 'M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2' }], ['path', { d: 'M10 6h4' }], ['path', { d: 'M10 10h4' }], ['path', { d: 'M10 14h4' }], ['path', { d: 'M10 18h4' }]],
  House: [['path', { d: 'm3 11 9-8 9 8' }], ['path', { d: 'M5 10v10h14V10' }], ['path', { d: 'M9 20v-6h6v6' }]],
  Pencil: [['path', { d: 'M12 20h9' }], ['path', { d: 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' }]],
  MapPinned: [['path', { d: 'M18 8c0 3.6-6 9-6 9s-6-5.4-6-9a6 6 0 1 1 12 0Z' }], ['circle', { cx: '12', cy: '8', r: '2' }], ['path', { d: 'M8.8 17.5 5 19l7 3 7-3-3.8-1.5' }]],
  Check: [['path', { d: 'm20 6-11 11-5-5' }]],
  Banknote: [['rect', { width: '20', height: '12', x: '2', y: '6', rx: '2' }], ['circle', { cx: '12', cy: '12', r: '2' }], ['path', { d: 'M6 12h.01M18 12h.01' }]],
  KeyRound: [['path', { d: 'M2.586 17.414A2 2 0 0 0 2 18.828V21h2.172a2 2 0 0 0 1.414-.586l8.704-8.704' }], ['circle', { cx: '16', cy: '8', r: '5' }], ['path', { d: 'm15 9 1-1' }]],
  Laptop: [['rect', { width: '18', height: '12', x: '3', y: '4', rx: '2' }], ['line', { x1: '2', x2: '22', y1: '20', y2: '20' }]],
  Smartphone: [['rect', { width: '14', height: '20', x: '5', y: '2', rx: '2' }], ['path', { d: 'M12 18h.01' }]],
  MessageCircle: [['path', { d: 'M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z' }]],
  MessageCircleMore: [['path', { d: 'M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z' }], ['path', { d: 'M8 10h.01' }], ['path', { d: 'M12 10h.01' }], ['path', { d: 'M16 10h.01' }]],
  Phone: [['path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z' }]],
  Send: [['path', { d: 'm22 2-7 20-4-9-9-4Z' }], ['path', { d: 'M22 2 11 13' }]],
  WalletCards: [['rect', { width: '18', height: '13', x: '3', y: '6', rx: '2' }], ['path', { d: 'M3 10h18' }], ['path', { d: 'M7 3h10' }]],
  Gift: [['rect', { x: '3', y: '8', width: '18', height: '13', rx: '2' }], ['path', { d: 'M12 8v13' }], ['path', { d: 'M3 12h18' }], ['path', { d: 'M7.5 8a2.5 2.5 0 1 1 4.5-1.5V8' }], ['path', { d: 'M16.5 8A2.5 2.5 0 1 0 12 6.5V8' }]],
  Award: [['circle', { cx: '12', cy: '8', r: '6' }], ['path', { d: 'M8.2 13.5 7 22l5-3 5 3-1.2-8.5' }]],
  TicketPercent: [['path', { d: 'M2 9a3 3 0 0 0 0 6v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a3 3 0 0 0 0-6V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z' }], ['path', { d: 'm9 9 6 6' }], ['circle', { cx: '9', cy: '15', r: '1' }], ['circle', { cx: '15', cy: '9', r: '1' }]],
  Coins: [['circle', { cx: '8', cy: '8', r: '5' }], ['path', { d: 'M18.09 10.37A5 5 0 1 1 10.37 18.09' }], ['path', { d: 'M7 6h1v4' }], ['path', { d: 'm16.7 13.4.7.7-2.8 2.8' }]],
  ReceiptText: [['path', { d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z' }], ['path', { d: 'M8 7h8' }], ['path', { d: 'M8 11h8' }], ['path', { d: 'M8 15h5' }]],
  BellRing: [['path', { d: 'M10.268 21a2 2 0 0 0 3.464 0' }], ['path', { d: 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326' }], ['path', { d: 'M4 2 2 4' }], ['path', { d: 'm20 2 2 2' }]],
  Users: [['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }], ['circle', { cx: '9', cy: '7', r: '4' }], ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }], ['path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' }]],
  Copy: [['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2' }], ['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }]],
}

const LucideIcon = defineComponent({
  name: 'LucideIcon',
  props: { name: String, size: { type: [Number, String], default: 20 }, strokeWidth: { type: [Number, String], default: 1.8 } },
  setup(iconProps) {
    return () => h('svg', {
      width: iconProps.size,
      height: iconProps.size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': iconProps.strokeWidth,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true',
    }, (iconShapes[iconProps.name] || iconShapes.Sparkles).map(([tag, attrs]) => h(tag, attrs)))
  },
})

const ProfileHeading = defineComponent({
  name: 'ProfileHeading',
  props: { eyebrow: String, title: String, description: String },
  setup(headingProps, { slots }) {
    return () => h('header', { class: 'profile-section-heading' }, [
      h('div', {}, [
        h('span', { class: 'profile-eyebrow' }, headingProps.eyebrow),
        h('h1', {}, headingProps.title),
        h('p', {}, headingProps.description),
      ]),
      slots.action ? h('div', { class: 'profile-heading-action' }, slots.action()) : null,
    ])
  },
})

const navigation = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'orders', label: 'My orders', icon: 'Package', badge: '2' },
  { id: 'wishlist', label: 'Wishlist', icon: 'Heart' },
  { id: 'rewards', label: 'Rewards & wallet', icon: 'WalletCards', badge: '3' },
  { id: 'details', label: 'Profile details', icon: 'UserRound' },
  { id: 'addresses', label: 'Addresses', icon: 'MapPin' },
  { id: 'payments', label: 'Payments', icon: 'CreditCard' },
  { id: 'security', label: 'Login & security', icon: 'ShieldCheck' },
  { id: 'support', label: 'Help & support', icon: 'Headphones' },
]

const activeSection = ref('overview')
const orderFilter = ref('All')
const orderSearch = ref('')
const expandedOrder = ref('')
const showAddressForm = ref(false)
const editingAddressId = ref(null)
const showPasswordForm = ref(false)
const twoFactorEnabled = ref(false)

const defaultProfile = {
  firstName: 'Dinura',
  lastName: 'Perera',
  email: 'dinura@zappymart.lk',
  phone: '+94 77 123 4567',
  language: 'English',
  fulfilment: 'Home delivery',
  dateOfBirth: '2003-08-14',
  preferredContact: 'WhatsApp',
}

const savedProfile = (() => {
  try { return JSON.parse(localStorage.getItem('zappymart-customer-profile') || 'null') } catch { return null }
})()
const migratedProfile = savedProfile?.firstName === 'Navi' ? { ...savedProfile, firstName: 'Dinura', email: 'dinura@zappymart.lk' } : savedProfile
const profile = reactive({ ...defaultProfile, ...(migratedProfile || {}) })

const fallbackWishlist = [
  { title: 'Premium Wireless Headphones', category: 'Audio Devices', price: 18900, old: 22900, img: productImage1 },
  { title: 'Smart Everyday Watch', category: 'Wearables', price: 24500, old: 28900, img: productImage2 },
  { title: 'Portable Bluetooth Speaker', category: 'Audio Devices', price: 12900, old: 15900, img: productImage3 },
  { title: 'Compact Home Appliance', category: 'Home Appliances', price: 16900, old: 19800, img: productImage4 },
]

const displayWishlist = computed(() => props.wishlistItems.length ? props.wishlistItems : fallbackWishlist)
const cartCount = computed(() => props.cartItems.reduce((total, item) => total + Number(item.quantity || 1), 0))
const initials = computed(() => `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase())
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
})
const profileCompletion = computed(() => {
  const values = [profile.firstName, profile.lastName, profile.email, profile.phone, profile.dateOfBirth, addresses.value.length]
  return Math.round((values.filter(Boolean).length / values.length) * 100)
})

const loyaltyPoints = ref(2450)
const tierTarget = 3500
const walletBalance = ref(1250)
const pointsToNext = computed(() => Math.max(0, tierTarget - loyaltyPoints.value))
const referralCode = 'DINURA500'
const vouchers = ref([
  { label: 'Member reward', value: 'Rs. 750 OFF', code: 'GOLD750', description: 'Use on orders above Rs. 12,000. Valid until 31 Aug 2026.' },
  { label: 'Delivery benefit', value: 'FREE DELIVERY', code: 'SHIPFREE', description: 'Available for selected Colombo delivery zones.' },
  { label: 'Wishlist offer', value: '10% OFF', code: 'WISH10', description: 'Valid on one eligible product from your wishlist.' },
])
const recentActivity = [
  { icon: 'Truck', title: 'Order is on the way', text: 'Order ZM-10482 left the Colombo fulfilment centre.', time: 'Today' },
  { icon: 'Coins', title: '180 reward points added', text: 'Points earned from your recent audio purchase.', time: '2 days' },
  { icon: 'Heart', title: 'Wishlist price changed', text: 'One saved product is now available at a lower price.', time: '4 days' },
]
const preferences = reactive({ offers: true, whatsapp: true, recommendations: true })

const orders = ref([
  {
    id: 'ZM-10482', date: '18 Jul 2026', status: 'In transit', total: 28450, progress: 74, eta: '25 Jul 2026',
    items: [
      { title: 'Premium Wireless Headphones', quantity: 1, price: 18900, image: productImage1, category: 'Audio Devices', img: productImage1 },
      { title: 'Smart Charging Adapter', quantity: 1, price: 9550, image: productImage2, category: 'Electronics', img: productImage2 },
    ],
  },
  { id: 'ZM-10398', date: '02 Jul 2026', status: 'Delivered', total: 36900, progress: 100, eta: '06 Jul 2026', items: [{ title: 'Portable Bluetooth Speaker', quantity: 2, price: 18450, image: productImage3, category: 'Audio Devices', img: productImage3 }] },
  { id: 'ZM-10241', date: '11 Jun 2026', status: 'Processing', total: 16900, progress: 35, eta: '28 Jul 2026', items: [{ title: 'Compact Home Appliance', quantity: 1, price: 16900, image: productImage4, category: 'Home Appliances', img: productImage4 }] },
])
const activeOrders = computed(() => orders.value.filter((order) => !['Delivered', 'Cancelled'].includes(order.status)).length)
const deliveredOrders = computed(() => orders.value.filter((order) => order.status === 'Delivered').length)
const orderSpend = computed(() => orders.value.reduce((total, order) => total + Number(order.total || 0), 0))
const orderFilters = ['All', 'Processing', 'In transit', 'Delivered']
const filteredOrders = computed(() => {
  const term = orderSearch.value.trim().toLowerCase()
  return orders.value.filter((order) => {
    const statusMatch = orderFilter.value === 'All' || order.status === orderFilter.value
    const text = `${order.id} ${order.items.map((item) => item.title).join(' ')}`.toLowerCase()
    return statusMatch && (!term || text.includes(term))
  })
})

const storedAddresses = (() => {
  try { return JSON.parse(localStorage.getItem('zappymart-customer-addresses') || 'null') } catch { return null }
})()
const addresses = ref(storedAddresses || [
  { id: 1, label: 'Home', recipient: 'Dinura Perera', line1: '18 Lake View Road', city: 'Colombo 05', district: 'Colombo', postalCode: '00500', phone: '+94 77 123 4567', isDefault: true },
  { id: 2, label: 'Office', recipient: 'Dinura Perera', line1: 'Level 08, Orion City', city: 'Colombo 09', district: 'Colombo', postalCode: '00900', phone: '+94 77 123 4567', isDefault: false },
])
const defaultAddress = computed(() => addresses.value.find((address) => address.isDefault) || addresses.value[0])
const emptyAddress = () => ({ label: '', recipient: '', line1: '', city: '', district: '', postalCode: '', phone: '', isDefault: false })
const addressForm = reactive(emptyAddress())

const paymentMethods = ref([
  { id: 1, type: 'visa', brand: 'VISA', number: '••••  ••••  ••••  4242', holder: 'DINURA PERERA', expiry: '09/29', isDefault: true },
  { id: 2, type: 'mastercard', brand: 'mastercard', number: '••••  ••••  ••••  8018', holder: 'DINURA PERERA', expiry: '04/28', isDefault: false },
])

const passwordForm = reactive({ current: '', next: '', confirm: '' })
const sessions = [
  { device: 'Chrome on Windows', location: 'Colombo, Sri Lanka', lastActive: 'Active now', icon: 'Laptop', current: true },
  { device: 'Mobile browser', location: 'Negombo, Sri Lanka', lastActive: 'Yesterday, 8:14 PM', icon: 'Smartphone', current: false },
]

const supportForm = reactive({ topic: '', orderId: '', message: '' })
const faqs = [
  { question: 'How can I track an active order?', answer: 'Open My Orders and choose Track order. The latest fulfilment step and estimated delivery date will be shown there.' },
  { question: 'How do I request a return?', answer: 'Open the completed order, select the product and choose the return option. Eligibility depends on the product and delivery date.' },
  { question: 'Where are my rewards applied?', answer: 'Available points, wallet credit and eligible vouchers appear during checkout before payment.' },
]
const whatsappNumber = String(import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567').replace(/\D/g, '')
const whatsappLink = computed(() => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello ZappyMart, I need help with my account or order.')}`)

const quickActions = [
  { target: 'orders', icon: 'Truck', title: 'Track orders', text: `${activeOrders.value} active deliveries` },
  { target: 'wishlist', icon: 'Heart', title: 'Wishlist', text: `${displayWishlist.value.length} saved products` },
  { target: 'rewards', icon: 'WalletCards', title: 'Rewards & wallet', text: `${loyaltyPoints.value.toLocaleString()} points available` },
  { target: 'addresses', icon: 'MapPin', title: 'Addresses', text: 'Manage delivery details' },
]

const toast = reactive({ visible: false, message: '', icon: 'Check' })
let toastTimer
const showToast = (message, icon = 'Check') => {
  toast.visible = false
  clearTimeout(toastTimer)
  requestAnimationFrame(() => {
    toast.message = message
    toast.icon = icon
    toast.visible = true
    toastTimer = setTimeout(() => { toast.visible = false }, 3200)
  })
}

const selectSection = (section) => {
  activeSection.value = section
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const formatPrice = (value) => `Rs. ${Number(value || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}`
const statusClass = (status) => status.toLowerCase().replaceAll(' ', '-')
const openOrder = (id) => showToast(`Order ${id} tracking details opened.`, 'Package')
const downloadInvoice = (order) => {
  const invoice = `ZappyMart Invoice\nOrder: ${order.id}\nDate: ${order.date}\nTotal: ${formatPrice(order.total)}\nStatus: ${order.status}`
  const file = new Blob([invoice], { type: 'text/plain' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(file)
  link.download = `${order.id}-invoice.txt`
  link.click()
  URL.revokeObjectURL(link.href)
  showToast('Invoice downloaded.', 'Download')
}
const buyAgain = (item) => {
  emit('add-to-cart', { ...item, title: item.title, price: item.price, img: item.img || item.image, quantity: item.quantity || 1 })
  showToast(`${item.title} added to cart.`, 'ShoppingBag')
}
const addWishlistToCart = (item) => {
  emit('add-to-cart', { ...item, img: item.img || item.image, quantity: 1 })
  showToast(`${item.title} added to cart.`, 'ShoppingBag')
}
const removeWishlist = (item) => {
  if (props.wishlistItems.length) emit('remove-wishlist', item.title)
  else showToast('Demo wishlist item removed.', 'Heart')
}
const saveProfile = () => {
  localStorage.setItem('zappymart-customer-profile', JSON.stringify(profile))
  showToast('Profile details saved.', 'Save')
}
const persistAddresses = () => localStorage.setItem('zappymart-customer-addresses', JSON.stringify(addresses.value))
const setDefaultAddress = (id) => {
  addresses.value = addresses.value.map((address) => ({ ...address, isDefault: address.id === id }))
  persistAddresses()
  showToast('Default address updated.', 'MapPin')
}
const editAddress = (address) => {
  Object.assign(addressForm, address)
  editingAddressId.value = address.id
  showAddressForm.value = true
  setTimeout(() => document.querySelector('.compact-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
}
const resetAddressForm = () => {
  Object.assign(addressForm, emptyAddress())
  editingAddressId.value = null
  showAddressForm.value = false
}
const saveAddress = () => {
  if (addressForm.isDefault) addresses.value = addresses.value.map((address) => ({ ...address, isDefault: false }))
  if (editingAddressId.value) {
    addresses.value = addresses.value.map((address) => address.id === editingAddressId.value ? { ...address, ...addressForm } : address)
  } else {
    addresses.value.push({ ...addressForm, id: Date.now(), isDefault: addressForm.isDefault || addresses.value.length === 0 })
  }
  persistAddresses()
  resetAddressForm()
  showToast('Address saved.', 'MapPin')
}
const removeAddress = (id) => {
  const removed = addresses.value.find((address) => address.id === id)
  addresses.value = addresses.value.filter((address) => address.id !== id)
  if (removed?.isDefault && addresses.value.length) addresses.value[0].isDefault = true
  persistAddresses()
  showToast('Address removed.', 'MapPin')
}
const savePassword = () => {
  if (passwordForm.next !== passwordForm.confirm) {
    showToast('New passwords do not match.', 'ShieldCheck')
    return
  }
  passwordForm.current = ''
  passwordForm.next = ''
  passwordForm.confirm = ''
  showPasswordForm.value = false
  showToast('Password updated successfully.', 'ShieldCheck')
}
const redeemVoucher = (voucher) => {
  showToast(`${voucher.code} is ready to use at checkout.`, 'TicketPercent')
}
const copyReferral = async () => {
  try {
    await navigator.clipboard.writeText(referralCode)
    showToast('Referral code copied.', 'Copy')
  } catch {
    showToast(`Referral code: ${referralCode}`, 'Copy')
  }
}
const savePreferences = () => {
  localStorage.setItem('zappymart-customer-preferences', JSON.stringify(preferences))
  showToast('Communication preferences saved.', 'BellRing')
}
const submitSupport = () => {
  supportForm.topic = ''
  supportForm.orderId = ''
  supportForm.message = ''
  showToast('Support request submitted.', 'Send')
}
</script>
